import { ActionType, getType } from 'typesafe-actions';
import { fetchInvoice } from './actions';
import { InvoicesState } from './models';

const reducerActions = {
  fetchInvoiceRequest: fetchInvoice.request,
  fetchInvoiceSuccess: fetchInvoice.success,
  fetchInvoiceFailure: fetchInvoice.failure,
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
    case getType(fetchInvoice.request):
      return {
        ...state,
        loading: true,
      };

    case getType(fetchInvoice.success):
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.invoiceId]: action.payload.data,
        },
        loading: false,
      };

    case getType(fetchInvoice.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};