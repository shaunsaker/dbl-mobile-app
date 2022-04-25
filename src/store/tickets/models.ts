import { InvoiceId } from '../invoices/models';
import { LotId } from '../lots/models';
import { UserId } from '../userProfile/models';

export type TicketId = string;

export enum TicketStatus {
  reserved = 'Reserved',
  paymentReceived = 'Payment Received',
  confirmed = 'Confirmed',
  expired = 'Expired',
}

export interface Ticket {
  id: TicketId;
  lotId: LotId;
  uid: UserId;
  priceBTC: number;
  status: TicketStatus;
  dateCreated: string;
  invoiceId: InvoiceId;
}

export interface TicketsState {
  data: { [key: TicketId]: Ticket } | undefined;
  loading: boolean;
}
