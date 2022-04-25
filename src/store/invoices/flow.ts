import { SagaIterator } from 'redux-saga';
import { fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { firebaseSyncInvoice } from '../../firebase/firestore/firebaseSyncInvoice';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { signOut } from '../auth/actions';
import { navigateBack } from '../navigation/actions';
import { fetchInvoice } from './actions';
import { Invoice } from './models';

function* onFetchInvoiceSaga(): SagaIterator {
  yield takeLatest(
    fetchInvoice.request,
    function* (action: ActionType<typeof fetchInvoice.request>) {
      try {
        // FIXME: handle errors here, .e.g by disabling this in Firebase security rules
        const channel = yield* call(firebaseSyncInvoice, action.payload);

        yield takeEvery(channel, function* (invoice: Invoice) {
          yield put(
            fetchInvoice.success({
              invoiceId: action.payload.invoiceId,
              data: invoice,
            }),
          );
        });

        // if the user closes the invoice or signs out, close the channel
        yield take([navigateBack, signOut.success]);

        channel.close();
      } catch (error) {
        yield* call(errorSaga, error, fetchInvoice.failure);
      }
    },
  );
}

export function* invoicesFlow(): SagaIterator {
  yield fork(onFetchInvoiceSaga);
}
