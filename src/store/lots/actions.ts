import { createAsyncAction } from 'typesafe-actions';
import { Lot, LotId } from './models';

export const fetchActiveLot = createAsyncAction(
  'LOTS/fetchActiveLotRequest',
  'LOTS/fetchActiveLotSuccess',
  'LOTS/fetchActiveLotFailure',
)<void, { data: Lot }, Error>();

export type ReserveTicketsRequestPayload = {
  lotId: LotId;
  ticketCount: number;
};
