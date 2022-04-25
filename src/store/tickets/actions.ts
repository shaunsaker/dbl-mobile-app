import { createAsyncAction } from 'typesafe-actions';
import { LotId } from '../lots/models';
import { Ticket } from './models';

export const fetchTickets = createAsyncAction(
  'TICKETS/fetchTicketsRequest',
  'TICKETS/fetchTicketsSuccess',
  'TICKETS/fetchTicketsFailure',
)<{ lotId: LotId }, { data: Ticket[] }, Error>();
