import { ActionType, getType } from 'typesafe-actions';
import { fetchActiveLot } from './actions';
import { LotsState } from './models';

const reducerActions = {
  fetchActiveLotRequest: fetchActiveLot.request,
  fetchActiveLotSuccess: fetchActiveLot.success,
  fetchActiveLotFailure: fetchActiveLot.failure,
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
      return {
        ...state,
        loading: true,
      };

    case getType(fetchActiveLot.success):
      // we can only have one active lot at a time, ie. lot.active === true
      // since we're adding the active lot to existing lots here
      // and the existing lots can have lot.active === true, we need to explicitly set it to false
      // NOTE: if we just fetch all the lots, we can remove this but that would be expensive
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

    case getType(fetchActiveLot.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
