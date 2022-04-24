import { ActionType, getType } from 'typesafe-actions';
import { fetchBtcRate } from './actions';
import { BtcRateState } from './models';

const reducerActions = {
  fetchBTCRateRequest: fetchBtcRate.request,
  fetchBTCRateSuccess: fetchBtcRate.success,
  fetchBTCRateFailure: fetchBtcRate.failure,
};

export const initialState: BtcRateState = {
  data: undefined,
  loading: false,
};

export const btcRateReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): BtcRateState => {
  switch (action.type) {
    case getType(fetchBtcRate.request):
      return {
        ...state,
        loading: true,
      };

    case getType(fetchBtcRate.success):
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.currency]: action.payload.data,
        },
        loading: false,
      };

    case getType(fetchBtcRate.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
