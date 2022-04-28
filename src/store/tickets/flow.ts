import { SagaIterator } from 'redux-saga';
import { fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { firebaseSyncTickets } from '../../firebase/firestore/firebaseSyncTickets';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { select } from '../../utils/typedSelect';
import { signOut } from '../auth/actions';
import { selectUid } from '../auth/selectors';
import { fetchActiveLot } from '../lots/actions';
import { selectActiveLot } from '../lots/selectors';
import { fetchTickets } from './actions';
import { Ticket } from './models';

function* onFetchTicketsFlow(): SagaIterator {
  yield takeLatest(
    fetchTickets.request,
    function* (action: ActionType<typeof fetchTickets.request>) {
      const userId = yield* select(selectUid);

      if (!userId) {
        yield* call(
          errorSaga,
          new Error('No user is signed in'),
          fetchTickets.failure,
        );

        return;
      }

      try {
        // FIXME: handle errors here, .e.g by disabling this in Firebase security rules
        // FIXME: we don't need to sync on old lot tickets
        const channel = yield* call(
          firebaseSyncTickets,
          action.payload.lotId,
          userId,
        );

        yield takeEvery(channel, function* (tickets: Ticket[]) {
          yield put(
            fetchTickets.success({
              data: tickets,
            }),
          );
        });

        yield take(signOut.success);

        channel.close();
      } catch (error) {
        yield* call(errorSaga, error, fetchTickets.failure);
      }
    },
  );
}

function* fetchActiveLotTicketsFlow(): SagaIterator {
  // only sync our tickets on the first active lot fetch (we need the lot id)
  yield take(fetchActiveLot.success);

  const activeLot = yield* select(selectActiveLot);

  if (!activeLot) {
    return;
  }

  yield put(fetchTickets.request({ lotId: activeLot.id }));
}

export function* ticketsFlow(): SagaIterator {
  yield fork(onFetchTicketsFlow);
  yield fork(fetchActiveLotTicketsFlow);
}
