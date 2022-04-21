import { SagaIterator } from 'redux-saga';
import { fork, put, take, takeEvery } from 'redux-saga/effects';
import { firebaseSyncTickets } from '../../firebase/firestore/firebaseSyncTickets';
import { arrayToObject } from '../../utils/arrayToObject';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { select } from '../../utils/typedSelect';
import { signOut } from '../auth/actions';
import { selectUid } from '../auth/selectors';
import { fetchActiveLot } from '../lots/actions';
import { selectActiveLot } from '../lots/selectors';
import { fetchTickets } from './actions';
import { Ticket, TicketsData } from './models';

// istanbul ignore next
function* fetchTicketsSaga(): SagaIterator {
  // only sync our tickets on the first active lot fetch
  yield take(fetchActiveLot.success);

  const activeLot = yield* select(selectActiveLot);

  if (!activeLot) {
    return;
  }

  yield put(fetchTickets.request(activeLot.id));

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
    const channel = yield* call(
      firebaseSyncTickets,
      activeLot.id,
      userId as string,
    );

    yield takeEvery(channel, function* (ticketsArray: Ticket[]) {
      const data: TicketsData = arrayToObject(ticketsArray, 'id');

      yield put(
        fetchTickets.success({
          lotId: activeLot.id,
          data,
        }),
      );
    });

    yield take(signOut.success);

    channel.close();
  } catch (error) {
    yield* call(errorSaga, error, fetchTickets.failure);
  }
}

// istanbul ignore next
export function* ticketsFlow(): SagaIterator {
  yield fork(fetchTicketsSaga);
}
