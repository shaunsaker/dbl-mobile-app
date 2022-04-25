import { SagaIterator } from 'redux-saga';
import { fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { firebaseSyncPayments } from '../../firebase/firestore/firebaseSyncPayments';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { select } from '../../utils/typedSelect';
import { signOut } from '../auth/actions';
import { selectUid } from '../auth/selectors';
import { navigateBack } from '../navigation/actions';
import { fetchPayments } from './actions';
import { Payment } from './models';

function* onFetchPaymentsSaga(): SagaIterator {
  yield takeLatest(
    fetchPayments.request,
    function* (action: ActionType<typeof fetchPayments.request>) {
      const uid = yield* select(selectUid);

      if (!uid) {
        return;
      }

      try {
        // FIXME: handle errors here, .e.g by disabling this in Firebase security rules
        const channel = yield* call(firebaseSyncPayments, {
          ...action.payload,
          uid,
        });

        yield takeEvery(channel, function* (payments: Payment[]) {
          yield put(
            fetchPayments.success({
              data: payments,
            }),
          );
        });

        // if the user closes the invoice or signs out, close the channel
        yield take([navigateBack, signOut.success]);

        channel.close();
      } catch (error) {
        yield* call(errorSaga, error, fetchPayments.failure);
      }
    },
  );
}

export function* paymentsFlow(): SagaIterator {
  yield fork(onFetchPaymentsSaga);
}
