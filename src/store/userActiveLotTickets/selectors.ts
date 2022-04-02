import { objectToArray } from '../../utils/objectToArray';
import { ApplicationState } from '../reducers';
import { TicketStatus } from './models';

export const selectUserActiveLotTickets = (state: ApplicationState) => {
  if (!state.userActiveLotTickets.data) {
    return null;
  }

  return state.userActiveLotTickets.data;
};

export const selectUserActiveLotTicketsPendingDeposit = (
  state: ApplicationState,
) => {
  const tickets = selectUserActiveLotTickets(state);

  if (!tickets) {
    return [];
  }

  const ticketsPendingDeposit = objectToArray(tickets).filter(
    ticket => ticket.status === TicketStatus.pendingDeposit,
  );

  return ticketsPendingDeposit;
};

export const selectUserHasActiveLotTicketsPendingDeposit = (
  state: ApplicationState,
) => {
  const ticketsPendingDeposit = selectUserActiveLotTicketsPendingDeposit(state);

  return Boolean(ticketsPendingDeposit.length);
};

export const selectUserActiveLotTicketsPendingDepositCount = (
  state: ApplicationState,
) => {
  const ticketsPendingDeposit = selectUserActiveLotTicketsPendingDeposit(state);

  return ticketsPendingDeposit.length;
};

export const selectUserActiveLotsDataLoading = (state: ApplicationState) => {
  return state.userActiveLotTickets.loading;
};
