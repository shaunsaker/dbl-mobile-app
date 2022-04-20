import { LotId } from '../lots/models';
import { UserProfileData } from '../userProfile/models';

export type TicketId = string;

export enum TicketStatus {
  reserved = 'Reserved',
  paymentReceived = 'Payment Received',
  confirmed = 'Confirmed',
  expired = 'Expired',
}

export interface Ticket {
  id: TicketId;
  uid: UserProfileData;
  price: number;
  status: TicketStatus;
  dateCreated: string;
  invoicePaymentAddress: string;
  invoicePaymentTotal: number;
  invoicePaymentExpiry: string;
}

export type TicketsData = {
  [ticketId: TicketId]: Ticket;
};

export type LotTicketsData = {
  [lotId: LotId]: TicketsData;
};

export interface TicketsState {
  data: LotTicketsData | undefined;
  loading: boolean;
}
