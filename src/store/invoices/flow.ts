import { SagaIterator } from 'redux-saga';
import { fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { firebaseFetchInvoices } from '../../firebase/firestore/firebeaseFetchInvoices';
import { firebaseSyncLotInvoices } from '../../firebase/firestore/firebaseSyncActiveLotInvoices';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { select } from '../../utils/typedSelect';
import { signOut } from '../auth/actions';
import { selectUid } from '../auth/selectors';
import { fetchActiveLot } from '../lots/actions';
import { fetchActiveLotInvoices, fetchInvoices } from './actions';
import { Invoice } from './models';

function* fetchActiveLotInvoicesSaga(): SagaIterator {
  yield takeLatest(
    fetchActiveLot.success,
    function* (action: ActionType<typeof fetchActiveLot.success>) {
      yield put(fetchActiveLotInvoices.request());

      const uid = yield* select(selectUid);

      if (!uid) {
        yield* call(
          errorSaga,
          new Error('No user sign in'),
          fetchActiveLotInvoices.failure,
        );

        return;
      }

      try {
        // FIXME: handle errors here, .e.g by disabling this in Firebase security rules
        const channel = yield* call(firebaseSyncLotInvoices, {
          lotId: action.payload.data.id,
          uid,
        });

        yield takeEvery(channel, function* (invoices: Invoice[]) {
          yield put(fetchActiveLotInvoices.success({ data: invoices }));
        });

        // close the channel on sign out or when a new lot becomes active
        yield take([signOut.success, fetchActiveLot.success]);

        channel.close();
      } catch (error) {
        yield* call(errorSaga, error, fetchActiveLotInvoices.failure);
      }
    },
  );
}

function* onFetchInvoicesSaga(): SagaIterator {
  yield takeLatest(
    fetchInvoices.request,
    function* (action: ActionType<typeof fetchInvoices.request>) {
      const uid = yield* select(selectUid);

      if (!uid) {
        yield* call(
          errorSaga,
          new Error('No user sign in'),
          fetchActiveLotInvoices.failure,
        );

        return;
      }

      try {
        const invoices = yield* call(firebaseFetchInvoices, {
          lotId: action.payload.lotId,
          uid,
        });

        yield put(
          fetchInvoices.success({
            data: invoices,
          }),
        );
      } catch (error) {
        yield* call(errorSaga, error, fetchInvoices.failure);
      }
    },
  );
}

export function* invoicesFlow(): SagaIterator {
  yield fork(fetchActiveLotInvoicesSaga);
  yield fork(onFetchInvoicesSaga);
}
