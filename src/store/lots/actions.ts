import { createAsyncAction } from 'typesafe-actions';
import { Lot, LotId } from './models';

export const fetchActiveLot = createAsyncAction(
  'LOTS/fetchActiveLotRequest',
  'LOTS/fetchActiveLotSuccess',
  'LOTS/fetchActiveLotFailure',
)<void, { data: Lot }, Error>();

export const fetchLatestInactiveLot = createAsyncAction(
  'LOTS/fetchLatestInactiveLotRequest',
  'LOTS/fetchLatestInactiveLotSuccess',
  'LOTS/fetchLatestInactiveLotFailure',
)<void, { data: Lot }, Error>();

export const fetchInactiveLots = createAsyncAction(
  'LOTS/fetchInactiveLotsRequest',
  'LOTS/fetchInactiveLotsSuccess',
  'LOTS/fetchInactiveLotsFailure',
)<{ startAfter: string; limit: number }, { data: Lot[] }, Error>();

export type ReserveTicketsRequestPayload = {
  lotId: LotId;
  ticketCount: number;
};
