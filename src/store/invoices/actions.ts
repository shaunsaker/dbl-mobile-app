import { createAsyncAction } from 'typesafe-actions';
import { LotId } from '../lots/models';
import { Invoice } from './models';

export const fetchActiveLotInvoices = createAsyncAction(
  'INVOICES/fetchActiveLotInvoicesRequest',
  'INVOICES/fetchActiveLotInvoicesSuccess',
  'INVOICES/fetchActiveLotInvoicesFailure',
)<void, { data: Invoice[] }, Error>();

export const fetchInvoices = createAsyncAction(
  'INVOICES/fetchInvoicesRequest',
  'INVOICES/fetchInvoicesSuccess',
  'INVOICES/fetchInvoicesFailure',
)<{ lotId: LotId }, { data: Invoice[] }, Error>();
