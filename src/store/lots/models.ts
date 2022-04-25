import { Username } from '../userProfile/models';

export const MAX_BTC_DIGITS = 8; // when rounded up, this is equivalent to $0.004 which is negligible

export type LotId = string;

export type BlockchainAddress = string;

export interface Lot {
  id: LotId; // it's not present when created but is present when fetched
  active: boolean; // only one lot is active at a time
  ticketPriceUSD: number;
  totalBTC: number;
  totalTickets: number;
  totalConfirmedTickets: number;
  totalAvailableTickets: number;
  perUserTicketLimit: number;
  dateCreated: string;
  lastCallTime: string;
  drawTime: string;
  winnerUsername?: Username;
}

export interface LotsState {
  data: { [key: LotId]: Lot } | undefined;
  loading: boolean;
}
