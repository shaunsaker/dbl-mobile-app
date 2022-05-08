import { ActionType, getType } from 'typesafe-actions';
import { arrayToObject } from '../../utils/arrayToObject';
import { signOut } from '../auth/actions';
import { fetchActiveLotInvoices, fetchInvoices } from './actions';
import { InvoicesState } from './models';

const reducerActions = {
  signOutSuccess: signOut.success,
  fetchActiveLotInvoicesRequest: fetchActiveLotInvoices.request,
  fetchActiveLotInvoicesSuccess: fetchActiveLotInvoices.success,
  fetchActiveLotInvoicesFailure: fetchActiveLotInvoices.failure,
  fetchInvoicesRequest: fetchInvoices.request,
  fetchInvoicesSuccess: fetchInvoices.success,
  fetchInvoicesFailure: fetchInvoices.failure,
};

export const initialState: InvoicesState = {
  data: undefined,
  loading: false,
};

export const invoicesReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): InvoicesState => {
  switch (action.type) {
    case getType(signOut.success):
      return initialState;

    case getType(fetchActiveLotInvoices.request):
    case getType(fetchInvoices.request):
      return {
        ...state,
        loading: true,
      };

    case getType(fetchActiveLotInvoices.success):
    case getType(fetchInvoices.success):
      const invoicesObject = arrayToObject(action.payload.data, 'id');

      return {
        ...state,
        data: {
          ...state.data,
          ...invoicesObject,
        },
        loading: false,
      };

    case getType(fetchActiveLotInvoices.failure):
    case getType(fetchInvoices.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
