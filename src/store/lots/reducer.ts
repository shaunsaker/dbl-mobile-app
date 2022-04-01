import { ActionType, getType } from 'typesafe-actions';
import { fetchActiveLot, reserveTickets } from './actions';
import { LotsState } from './models';

const reducerActions = {
  fetchActiveLotRequest: fetchActiveLot.request,
  fetchActiveLotSuccess: fetchActiveLot.success,
  fetchActiveLotFailure: fetchActiveLot.failure,
  reserveTicketsRequest: reserveTickets.request,
  reserveTicketsSuccess: reserveTickets.success,
  reserveTicketsFailure: reserveTickets.failure,
};

export const initialState: LotsState = {
  data: undefined,
  loading: false,
};

export const lotsReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): LotsState => {
  switch (action.type) {
    case getType(fetchActiveLot.request):
    case getType(reserveTickets.request):
      return {
        ...state,
        loading: true,
      };

    case getType(fetchActiveLot.success):
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        loading: false,
      };

    case getType(fetchActiveLot.failure):
    case getType(reserveTickets.success):
    case getType(reserveTickets.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
