import { ActionType, getType } from 'typesafe-actions';
import { fetchUserActiveLotTickets } from './actions';
import { UserActiveLotTicketsState } from './models';

const reducerActions = {
  fetchUserActiveLotTicketsRequest: fetchUserActiveLotTickets.request,
  fetchUserActiveLotTicketsSuccess: fetchUserActiveLotTickets.success,
  fetchUserActiveLotTicketsFailure: fetchUserActiveLotTickets.failure,
};

export const initialState: UserActiveLotTicketsState = {
  data: undefined,
  loading: false,
};

export const userActiveLotTicketsReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): UserActiveLotTicketsState => {
  switch (action.type) {
    case getType(fetchUserActiveLotTickets.request):
      return {
        ...state,
        loading: true,
      };

    case getType(fetchUserActiveLotTickets.success):
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        loading: false,
      };

    case getType(fetchUserActiveLotTickets.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
