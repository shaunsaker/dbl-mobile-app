import { objectToArray } from '../../utils/objectToArray';
import { LotId } from '../lots/models';
import { selectActiveLot } from '../lots/selectors';
import { ApplicationState } from '../reducers';
import { TicketId, TicketStatus } from './models';

export const selectLotsDataLoading = (state: ApplicationState) => {
  return state.tickets.loading;
};

export const selectTicketsByLotId = (state: ApplicationState, lotId: LotId) => {
  if (!state.tickets.data) {
    return null;
  }

  return state.tickets.data[lotId];
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

  const ticketsArray = objectToArray(tickets);
  const confirmedTickets = ticketsArray.filter(
    ticket => ticket.status === TicketStatus.confirmed,
  );

  return confirmedTickets;
};

export const selectTicketById = (
  state: ApplicationState,
  { lotId, ticketId }: { lotId: LotId; ticketId: TicketId },
) => {
  const tickets = selectTicketsByLotId(state, lotId);

  if (!tickets) {
    return null;
  }

  const ticket = tickets[ticketId];

  return ticket;
};
