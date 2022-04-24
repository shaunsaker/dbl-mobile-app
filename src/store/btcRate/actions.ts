import { createAsyncAction } from 'typesafe-actions';
import { Currency } from './models';

export const fetchBtcRate = createAsyncAction(
  'btcRate/fetchBTCRateRequest',
  'btcRate/fetchBTCRateSuccess',
  'btcRate/fetchBTCRateFailure',
)<{ currency: Currency }, { currency: Currency; data: number }, Error>();
