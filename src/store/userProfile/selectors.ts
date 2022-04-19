import { ApplicationState } from '../reducers';

export const selectUsername = (state: ApplicationState) => {
  if (!state.userProfile.data) {
    return null;
  }

  return state.userProfile.data.username;
};

export const selectUserEmail = (state: ApplicationState) => {
  if (!state.userProfile.data) {
    return null;
  }

  return state.userProfile.data.email;
};

export const selectHasCompletedOnboarding = (state: ApplicationState) => {
  if (!state.userProfile.data) {
    return null;
  }

  return state.userProfile.data.hasCompletedOnboarding;
};
