import { createAsyncAction } from 'typesafe-actions';
import { LotId } from '../lots/models';
import { TicketsData } from './models';

export const fetchTickets = createAsyncAction(
  'TICKETS/fetchTicketsRequest',
  'TICKETS/fetchTicketsSuccess',
  'TICKETS/fetchTicketsFailure',
)<LotId, { lotId: LotId; data: TicketsData }, Error>();
