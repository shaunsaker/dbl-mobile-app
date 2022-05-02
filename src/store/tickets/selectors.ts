import { objectToArray } from '../../utils/objectToArray';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { LotId } from '../lots/models';
import { selectActiveLot } from '../lots/selectors';
import { ApplicationState } from '../reducers';
import { Ticket, TicketId, TicketStatus } from './models';

export const selectTicketsDataLoading = (state: ApplicationState) => {
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
    return [];
  }

  const ticketsArray = objectToArray(tickets);
  const lotTickets = ticketsArray.filter(ticket => ticket.lotId === lotId);

  // convert the tickets object to an array
  // sort them from newest to oldest
  const sortedTicketsArray = sortArrayOfObjectsByKey(
    lotTickets,
    'dateCreated',
    true,
  );

  return sortedTicketsArray;
};

export const selectActiveLotTickets = (state: ApplicationState) => {
  const activeLot = selectActiveLot(state);

  if (!activeLot) {
    return [];
  }

  const tickets = selectTicketsByLotId(state, activeLot.id);

  return tickets;
};

export const selectTicketById = (state: ApplicationState, id: TicketId) => {
  const tickets = selectTickets(state);

  if (!tickets) {
    return null;
  }

  const ticket = tickets[id];

  return ticket;
};

export const selectTicketsByLotIdGroupedByStatus = (
  state: ApplicationState,
  lotId: LotId,
) => {
  const tickets = selectTicketsByLotId(state, lotId);
  const groups: { [key: string]: Ticket[] } = {
    [TicketStatus.reserved]: [],
    [TicketStatus.paymentReceived]: [],
    [TicketStatus.confirmed]: [],
    [TicketStatus.expired]: [],
  };

  tickets.forEach(ticket => {
    if (ticket.status === TicketStatus.reserved) {
      groups[TicketStatus.reserved].push(ticket);
    } else if (ticket.status === TicketStatus.paymentReceived) {
      groups[TicketStatus.paymentReceived].push(ticket);
    } else if (ticket.status === TicketStatus.confirmed) {
      groups[TicketStatus.confirmed].push(ticket);
    } else if (ticket.status === TicketStatus.expired) {
      groups[TicketStatus.expired].push(ticket);
    }
  });

  return groups;
};
