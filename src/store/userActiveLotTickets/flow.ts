import { SagaIterator } from 'redux-saga';
import { fork, put, take, takeEvery } from 'redux-saga/effects';
import { firebaseSyncUserActiveLotTickets } from '../../firebase/firestore/firebaseSyncUserActiveLotTickets';
import { arrayToObject } from '../../utils/arrayToObject';
import { call } from '../../utils/call';
import { connectSaga } from '../../utils/connectSaga';
import { errorSaga } from '../../utils/errorSaga';
import { select } from '../../utils/typedSelect';
import { signOut } from '../auth/actions';
import { selectUid } from '../auth/selectors';
import { selectActiveLot } from '../lots/selectors';
import { fetchUserActiveLotTickets } from './actions';
import { Ticket, TicketsData } from './models';

// istanbul ignore next
function* fetchUserActiveLotTicketsSaga(): SagaIterator {
  const activeLot = yield* select(selectActiveLot);

  if (activeLot) {
    yield put(fetchUserActiveLotTickets.request());

    const userId = yield* select(selectUid);

    if (!userId) {
      yield* call(
        errorSaga,
        new Error('No user is signed in'),
        fetchUserActiveLotTickets.failure,
      );

      return;
    }

    try {
      // FIXME: handle errors here, .e.g by disabling this in Firebase security rules
      const channel = yield* call(
        firebaseSyncUserActiveLotTickets,
        activeLot.id,
        userId as string,
      );

      yield takeEvery(channel, function* (ticketsArray: Ticket[]) {
        const data: TicketsData = arrayToObject(ticketsArray, 'id');

        yield put(
          fetchUserActiveLotTickets.success({
            data,
          }),
        );
      });

      yield take(signOut.success);

      channel.close();
    } catch (error) {
      yield* call(errorSaga, error, fetchUserActiveLotTickets.failure);
    }
  }
}

// istanbul ignore next
export function* userActiveLotTicketsFlow(): SagaIterator {
  yield fork(() => connectSaga(selectActiveLot, fetchUserActiveLotTicketsSaga));
}
