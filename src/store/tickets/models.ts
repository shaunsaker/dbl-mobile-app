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
  uid: UserId;
  priceBTC: number;
  status: TicketStatus;
  dateCreated: string;
  invoicePaymentAddress: string;
  invoicePaymentAmountBTC: number;
  invoicePaymentRate: number; // USD/BTC
  invoicePaymentExpiry: string;
  invoiceTicketIds: TicketId[];
}

export type TicketsData = Record<TicketId, Ticket>;

export type LotTicketsData = Record<LotId, TicketsData>;

export interface TicketsState {
  data: LotTicketsData | undefined;
  loading: boolean;
}
