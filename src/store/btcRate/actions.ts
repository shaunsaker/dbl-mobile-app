import { createAsyncAction } from 'typesafe-actions';
import { Currency } from './models';

export const fetchBtcRate = createAsyncAction(
  'BTC_RATE/fetchBtcRateRequest',
  'BTC_RATE/fetchBtcRateSuccess',
  'BTC_RATE/fetchBtcRateFailure',
)<{ currency: Currency }, { currency: Currency; data: number }, Error>();
