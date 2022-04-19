import { Timestamp } from '../models';

export type LotId = string;

export type BlockchainAddress = string;

export interface Lot {
  id: LotId;
  active: boolean; // only one lot is active at a time
  ticketPriceInBTC: number;
  BTCPriceInUSD: number;
  ticketCommissionInBTC: number;
  totalInBTC: number;
  ticketCount: number;
  ticketsLeft: number;
  perUserTicketLimit: number;
  ticketTimeout: number; // milliseconds
  drawTime: Timestamp;
  walletAddress: BlockchainAddress;
  dateCreated: Timestamp;
}

export type LotsData = Record<LotId, Lot>;

export interface LotsState {
  data: LotsData | undefined;
  loading: boolean;
}
