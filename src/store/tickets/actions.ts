import { createAsyncAction } from 'typesafe-actions';
import { LotId } from '../lots/models';
import { Ticket } from './models';

export const fetchActiveLotTickets = createAsyncAction(
  'TICKETS/fetchActiveLotTicketsRequest',
  'TICKETS/fetchActiveLotTicketsSuccess',
  'TICKETS/fetchActiveLotTicketsFailure',
)<void, { data: Ticket[] }, Error>();

export const fetchTickets = createAsyncAction(
  'TICKETS/fetchTicketsRequest',
  'TICKETS/fetchTicketsSuccess',
  'TICKETS/fetchTicketsFailure',
)<{ lotId: LotId }, { data: Ticket[] }, Error>();
