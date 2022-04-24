import { ApplicationState } from '../reducers';
import { Currency } from './models';

export const selectBtcRateDataLoading = (state: ApplicationState) => {
  return state.btcRate.loading;
};

export const selectBtcRateByCurrency = (
  state: ApplicationState,
  currency: Currency,
) => {
  if (!state.btcRate.data) {
    return 0;
  }

  return state.btcRate.data[currency];
};
