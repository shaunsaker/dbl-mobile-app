import { ApplicationState } from '../reducers';

export const selectHasCompletedOnboarding = (state: ApplicationState) => {
  return state.onboarding.hasCompletedOnboarding;
};
