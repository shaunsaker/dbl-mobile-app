import { createAsyncAction } from 'typesafe-actions';
import { InvoiceId } from '../invoices/models';
import { LotId } from '../lots/models';
import { Payment } from './models';

export const fetchPayments = createAsyncAction(
  'PAYMENTS/fetchPaymentsRequest',
  'PAYMENTS/fetchPaymentsSuccess',
  'PAYMENTS/fetchPaymentsFailure',
)<{ lotId: LotId; invoiceId: InvoiceId }, { data: Payment[] }, Error>();
