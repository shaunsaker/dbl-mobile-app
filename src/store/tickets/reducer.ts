import { ActionType, getType } from 'typesafe-actions';
import { fetchTickets } from './actions';
import { TicketsState } from './models';

const reducerActions = {
  fetchTicketsRequest: fetchTickets.request,
  fetchTicketsSuccess: fetchTickets.success,
  fetchTicketsFailure: fetchTickets.failure,
};

export const initialState: TicketsState = {
  data: undefined,
  loading: false,
};

export const ticketsReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): TicketsState => {
  switch (action.type) {
    case getType(fetchTickets.request):
      return {
        ...state,
        loading: true,
      };

    case getType(fetchTickets.success):
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.lotId]: { ...action.payload.data },
        },
        loading: false,
      };

    case getType(fetchTickets.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
