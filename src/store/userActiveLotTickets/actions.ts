import { createAsyncAction } from 'typesafe-actions';
import { TicketsData } from './models';

export const fetchUserActiveLotTickets = createAsyncAction(
  'USER_ACTIVE_LOT_TICKETS/fetchUserActiveLotTicketsRequest',
  'USER_ACTIVE_LOT_TICKETS/fetchUserActiveLotTicketsSuccess',
  'USER_ACTIVE_LOT_TICKETS/fetchUserActiveLotTicketsFailure',
)<void, { data: TicketsData }, Error>();
