import { ActionType, getType } from 'typesafe-actions';
import { arrayToObject } from '../../utils/arrayToObject';
import { signOut } from '../auth/actions';
import { fetchActiveLotTickets, fetchTickets } from './actions';
import { TicketsState } from './models';

const reducerActions = {
  signOutSuccess: signOut.success,
  fetchActiveLotTicketsRequest: fetchActiveLotTickets.request,
  fetchActiveLotTicketsSuccess: fetchActiveLotTickets.success,
  fetchActiveLotTicketsFailure: fetchActiveLotTickets.failure,
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
    case getType(signOut.success):
      return initialState;

    case getType(fetchActiveLotTickets.request):
    case getType(fetchTickets.request):
      return {
        ...state,
        loading: true,
      };

    case getType(fetchActiveLotTickets.success):
    case getType(fetchTickets.success):
      const ticketsObject = arrayToObject(action.payload.data, 'id');

      return {
        ...state,
        data: {
          ...state.data,
          ...ticketsObject,
        },
        loading: false,
      };

    case getType(fetchActiveLotTickets.failure):
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
