import { SagaIterator } from 'redux-saga';
import { fork, put } from 'redux-saga/effects';
import { getBtcRate } from '../../coinGecko/getBtcRate';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { safeDelay } from '../../utils/safeDelay';
import { fetchBtcRate } from './actions';
import { Currency } from './models';

const FETCH_RATE_INTERVAL_MS = 1000 * 60; // every minute

function* fetchBtcRateSaga(): SagaIterator {
  const currency = Currency.usd;

  yield put(fetchBtcRate.request({ currency }));

  try {
    const rate = yield* call(getBtcRate, currency);

    yield put(fetchBtcRate.success({ currency, data: rate }));

    // every X ms, call run this saga
    yield* call(safeDelay, FETCH_RATE_INTERVAL_MS);

    yield* call(fetchBtcRateSaga);
  } catch (error) {
    yield* call(errorSaga, error, fetchBtcRate.failure);
  }
}

export function* btcRateFlow(): SagaIterator {
  yield fork(fetchBtcRateSaga);
}
