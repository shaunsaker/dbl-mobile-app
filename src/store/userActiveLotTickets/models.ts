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
}

export type TicketsData = Record<TicketId, Ticket>;

export interface UserActiveLotTicketsState {
  data: TicketsData | undefined;
  loading: boolean;
}
