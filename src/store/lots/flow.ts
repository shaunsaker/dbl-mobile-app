import { SagaIterator } from 'redux-saga';
import { fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { firebaseReserveTickets } from '../../firebase/firestore/firebaseReserveTickets';
import { firebaseSyncActiveLot } from '../../firebase/firestore/firebaseSyncActiveLot';
import { arrayToObject } from '../../utils/arrayToObject';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { maybePluralise } from '../../utils/maybePluralise';
import { signOut } from '../auth/actions';
import { showSnackbar } from '../snackbars/actions';
import { SnackbarType } from '../snackbars/models';
import { fetchActiveLot, reserveTickets } from './actions';
import { Lot, LotsData } from './models';

// istanbul ignore next
function* fetchActiveLotSaga(): SagaIterator {
  yield put(fetchActiveLot.request());

  try {
    // FIXME: handle errors here, .e.g by disabling this in Firebase security rules
    const channel = yield* call(firebaseSyncActiveLot);

    yield takeEvery(channel, function* (lotsArray: Lot[]) {
      const data: LotsData = arrayToObject(lotsArray, 'id');

      yield put(
        fetchActiveLot.success({
          data,
        }),
      );
    });

    yield take(signOut.success);

    channel.close();
  } catch (error) {
    yield* call(errorSaga, error, fetchActiveLot.failure);
  }
}

function* onReserveTicketsSaga(): SagaIterator {
  yield takeLatest(
    reserveTickets.request,
    function* (action: ActionType<typeof reserveTickets.request>) {
      try {
        const response = yield* call(firebaseReserveTickets, action.payload);

        if (response.error) {
          yield* call(
            errorSaga,
            new Error(response.message),
            reserveTickets.failure,
          );

          return;
        }

        yield put(reserveTickets.success());

        yield put(
          showSnackbar({
            type: SnackbarType.success,
            title: 'Success',
            description: `We reserved ${maybePluralise(
              action.payload.ticketCount,
              'ticket',
            )} for you successfully`,
          }),
        );
      } catch (error) {
        yield* call(errorSaga, error, reserveTickets.failure);
      }
    },
  );
}

// istanbul ignore next
export function* lotsFlow(): SagaIterator {
  yield fork(fetchActiveLotSaga);
  yield fork(onReserveTicketsSaga);
}
