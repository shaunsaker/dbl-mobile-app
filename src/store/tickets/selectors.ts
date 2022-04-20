import { LotId } from '../lots/models';
import { selectActiveLot } from '../lots/selectors';
import { ApplicationState } from '../reducers';

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

export const selectsDataLoading = (state: ApplicationState) => {
  return state.tickets.loading;
};
