import { SagaIterator } from 'redux-saga';
import { fork, put, take, takeEvery } from 'redux-saga/effects';
import { firebaseFetchLatestInactiveLot } from '../../firebase/firestore/firebaseFetchLatestInactiveLot';
import { firebaseSyncActiveLot } from '../../firebase/firestore/firebaseSyncActiveLot';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { signOut } from '../auth/actions';
import { fetchActiveLot, fetchLatestInactiveLot } from './actions';
import { Lot } from './models';

// istanbul ignore next
function* fetchActiveLotSaga(): SagaIterator {
  yield put(fetchActiveLot.request());

  try {
    // FIXME: handle errors here, .e.g by disabling this in Firebase security rules
    const channel = yield* call(firebaseSyncActiveLot);

    yield takeEvery(channel, function* (lotsArray: Lot[]) {
      const activeLot = lotsArray[0]; // there can only be one active lot

      yield put(
        fetchActiveLot.success({
          data: activeLot,
        }),
      );
    });

    yield take(signOut.success);

    channel.close();
  } catch (error) {
    yield* call(errorSaga, error, fetchActiveLot.failure);
  }
}

function* fetchLatestInactiveLotSaga(): SagaIterator {
  yield put(fetchLatestInactiveLot.request());

  try {
    const lot = yield* call(firebaseFetchLatestInactiveLot);

    yield put(fetchLatestInactiveLot.success({ data: lot }));
  } catch (error) {
    yield* call(errorSaga, error, fetchLatestInactiveLot.failure);
  }
}

// istanbul ignore next
export function* lotsFlow(): SagaIterator {
  yield fork(fetchActiveLotSaga);
  yield fork(fetchLatestInactiveLotSaga);
}
