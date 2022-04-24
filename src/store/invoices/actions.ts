import { createAsyncAction } from 'typesafe-actions';
import { LotId } from '../lots/models';
import { Invoice, InvoiceId } from './models';

export const fetchInvoice = createAsyncAction(
  'INVOICES/fetchInvoiceRequest',
  'INVOICES/fetchInvoiceSuccess',
  'INVOICES/fetchInvoiceFailure',
)<
  { lotId: LotId; invoiceId: InvoiceId },
  { invoiceId: InvoiceId; data: Invoice },
  Error
>();
