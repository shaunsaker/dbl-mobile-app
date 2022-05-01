import { ActionType, getType } from 'typesafe-actions';
import { setHasCompletedOnboarding } from './actions';
import { OnboardingState } from './models';

const reducerActions = {
  setHasCompletedOnboarding,
};

export const initialState: OnboardingState = {
  hasCompletedOnboarding: false,
};

export const onboardingReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): OnboardingState => {
  switch (action.type) {
    case getType(setHasCompletedOnboarding):
      return {
        ...state,
        hasCompletedOnboarding: action.payload.hasCompletedOnboarding,
      };

    default: {
      return state;
    }
  }
};
