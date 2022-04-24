import { ApplicationState } from '../reducers';
import { InvoiceId } from './models';

export const selectInvoicesDataLoading = (state: ApplicationState) => {
  return state.invoices.loading;
};

export const selectInvoiceById = (state: ApplicationState, id: InvoiceId) => {
  if (!state.invoices.data) {
    return null;
  }

  return state.invoices.data[id];
};
