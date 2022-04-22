import { ActionType, getType } from 'typesafe-actions';
import { fetchActiveLot, fetchLatestInactiveLot } from './actions';
import { LotsState } from './models';

const reducerActions = {
  fetchActiveLotRequest: fetchActiveLot.request,
  fetchActiveLotSuccess: fetchActiveLot.success,
  fetchActiveLotFailure: fetchActiveLot.failure,
  fetchLatestInactiveLotRequest: fetchLatestInactiveLot.request,
  fetchLatestInactiveLotSuccess: fetchLatestInactiveLot.success,
  fetchLatestInactiveLotFailure: fetchLatestInactiveLot.failure,
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
    case getType(fetchLatestInactiveLot.request):
      return {
        ...state,
        loading: true,
      };

    case getType(fetchActiveLot.success):
      // we can only have one active lot at a time, ie. lot.active === true
      // since we're adding the active lot to existing lots here
      // and the existing lots can have lot.active === true, we need to explicitly set it to false
      // NOTE: if we just fetch all the lots, we can remove this but that would be expensive

      // if there is no active lot, just return the old state
      if (!action.payload.data) {
        return state;
      }

      const existingLots = {
        ...state.data,
      };

      Object.keys(existingLots).forEach(lotId => {
        existingLots[lotId].active = false;
      });

      return {
        ...state,
        data: {
          ...existingLots,
          [action.payload.data.id]: action.payload.data,
        },
        loading: false,
      };

    case getType(fetchLatestInactiveLot.success):
      // if there is no inactive lot, just return the old state
      if (!action.payload.data) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.data.id]: action.payload.data,
        },
        loading: false,
      };

    case getType(fetchActiveLot.failure):
    case getType(fetchLatestInactiveLot.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
