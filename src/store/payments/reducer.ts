import { ActionType, getType } from 'typesafe-actions';
import { arrayToObject } from '../../utils/arrayToObject';
import { signOut } from '../auth/actions';
import { fetchPayments } from './actions';
import { PaymentsState } from './models';

const reducerActions = {
  signOutSuccess: signOut.success,
  fetchPaymentsRequest: fetchPayments.request,
  fetchPaymentsSuccess: fetchPayments.success,
  fetchPaymentsFailure: fetchPayments.failure,
};

export const initialState: PaymentsState = {
  data: undefined,
  loading: false,
};

export const paymentsReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): PaymentsState => {
  switch (action.type) {
    case getType(signOut.success):
      return initialState;

    case getType(fetchPayments.request):
      return {
        ...state,
        loading: true,
      };

    case getType(fetchPayments.success):
      const paymentsObject = arrayToObject(action.payload.data, 'id');

      return {
        ...state,
        data: {
          ...state.data,
          ...paymentsObject,
        },
        loading: false,
      };

    case getType(fetchPayments.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
