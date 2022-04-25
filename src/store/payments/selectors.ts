import { objectToArray } from '../../utils/objectToArray';
import { InvoiceId } from '../invoices/models';
import { ApplicationState } from '../reducers';
import { PaymentId } from './models';

export const selectPaymentsDataLoading = (state: ApplicationState) => {
  return state.payments.loading;
};

export const selectPayments = (state: ApplicationState) => {
  if (!state.payments.data) {
    return null;
  }

  return state.payments.data;
};

export const selectPaymentById = (state: ApplicationState, id: PaymentId) => {
  const payments = selectPayments(state);

  if (!payments) {
    return null;
  }

  return payments[id];
};

export const selectPaymentsByInvoiceId = (
  state: ApplicationState,
  invoiceId: InvoiceId,
) => {
  const payments = selectPayments(state);

  if (!payments) {
    return null;
  }

  const paymentsArray = objectToArray(payments);
  const invoicePayments = paymentsArray.filter(
    payment => payment.invoiceId === invoiceId,
  );

  return invoicePayments;
};
