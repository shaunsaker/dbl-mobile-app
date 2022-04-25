import { objectToArray } from '../../utils/objectToArray';
import { LotId } from '../lots/models';
import { selectActiveLot } from '../lots/selectors';
import { ApplicationState } from '../reducers';
import { TicketId, TicketStatus } from './models';

export const selectLotsDataLoading = (state: ApplicationState) => {
  return state.tickets.loading;
};

export const selectTickets = (state: ApplicationState) => {
  if (!state.tickets.data) {
    return null;
  }

  const tickets = state.tickets.data;

  return tickets;
};

export const selectTicketsByLotId = (state: ApplicationState, lotId: LotId) => {
  const tickets = selectTickets(state);

  if (!tickets) {
    return null;
  }

  const ticketsArray = objectToArray(tickets);
  const lotTickets = ticketsArray.filter(ticket => ticket.lotId === lotId);

  return lotTickets;
};

export const selectActiveLotTickets = (state: ApplicationState) => {
  const activeLot = selectActiveLot(state);

  if (!activeLot) {
    return null;
  }

  const tickets = selectTicketsByLotId(state, activeLot.id);

  return tickets;
};

export const selectConfirmedActiveLotTickets = (state: ApplicationState) => {
  const tickets = selectActiveLotTickets(state);

  if (!tickets) {
    return null;
  }

  const confirmedTickets = tickets.filter(
    ticket => ticket.status === TicketStatus.confirmed,
  );

  return confirmedTickets;
};

export const selectTicketById = (state: ApplicationState, id: TicketId) => {
  const tickets = selectTickets(state);

  if (!tickets) {
    return null;
  }

  const ticket = tickets[id];

  return ticket;
};
