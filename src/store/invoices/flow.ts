import { SagaIterator } from 'redux-saga';
import { fork, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { firebaseFetchInvoice } from '../../firebase/firestore/firebaseFetchInvoice';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { fetchInvoice } from './actions';

function* onFetchInvoiceSaga(): SagaIterator {
  yield takeLatest(
    fetchInvoice.request,
    function* (action: ActionType<typeof fetchInvoice.request>) {
      try {
        const invoice = yield* call(firebaseFetchInvoice, action.payload);

        yield put(
          fetchInvoice.success({
            invoiceId: action.payload.invoiceId,
            data: invoice,
          }),
        );
      } catch (error) {
        yield* call(errorSaga, error, fetchInvoice.failure);
      }
    },
  );
}

export function* invoicesFlow(): SagaIterator {
  yield fork(onFetchInvoiceSaga);
}
