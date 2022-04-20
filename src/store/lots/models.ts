import { Username } from '../userProfile/models';

export const MAX_BTC_DIGITS = 8; // when rounded up, this is equivalent to $0.004 which is negligible

export type LotId = string;

export type BlockchainAddress = string;

export interface Lot {
  id: LotId; // it's not present when created but is present when fetched
  active: boolean; // only one lot is active at a time
  ticketPriceInBTC: number;
  BTCPriceInUSD: number;
  ticketCommissionInBTC: number;
  totalInBTC: number;
  confirmedTicketCount: number;
  ticketsAvailable: number;
  perUserTicketLimit: number;
  drawTime: string;
  lastCallTime: string;
  dateCreated: string;
  winnerUsername?: Username;
}

export type LotsData = Record<LotId, Lot>;

export interface LotsState {
  data: LotsData | undefined;
  loading: boolean;
}
