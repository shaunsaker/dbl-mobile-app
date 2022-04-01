import { createAsyncAction } from 'typesafe-actions';
import { WalletId } from '../userProfile/models';
import { LotId, LotsData } from './models';

export const fetchActiveLot = createAsyncAction(
  'LOTS/fetchActiveLotRequest',
  'LOTS/fetchActiveLotSuccess',
  'LOTS/fetchActiveLotFailure',
)<void, { data: LotsData }, Error>();

export type ReserveTicketsRequestPayload = {
  lotId: LotId;
  ticketCount: number;
  userWalletId: WalletId;
};

export const reserveTickets = createAsyncAction(
  'LOTS/reserveTicketsRequest',
  'LOTS/reserveTicketsSuccess',
  'LOTS/reserveTicketsFailure',
)<ReserveTicketsRequestPayload, void, Error>();
