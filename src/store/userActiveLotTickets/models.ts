import { BlockchainAddress } from '../lots/models';
import { Timestamp } from '../models';
import { UserProfileData } from '../userProfile/models';

export type TicketId = string;

export enum TicketStatus {
  pendingDeposit = 'pendingDeposit',
  active = 'active',
  timeout = 'timeout',
}

export interface Ticket {
  id: TicketId;
  uid: UserProfileData;
  status: TicketStatus;
  walletAddress: BlockchainAddress; // the address we're expecting the deposit from
  dateCreated: Timestamp;
  activatedTime?: Timestamp; // only once the deposit has been received and verified
}

export type TicketsData = Record<TicketId, Ticket>;

export interface UserActiveLotTicketsState {
  data: TicketsData | undefined;
  loading: boolean;
}
