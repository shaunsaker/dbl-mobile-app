import { LotId } from '../lots/models';
import { ApplicationState } from '../reducers';

export const selectUserProfileData = (state: ApplicationState) => {
  if (!state.userProfile.data) {
    return null;
  }

  return state.userProfile.data;
};

export const selectUsername = (state: ApplicationState) => {
  const data = selectUserProfileData(state);

  return data?.username;
};

export const selectUserEmail = (state: ApplicationState) => {
  const data = selectUserProfileData(state);

  return data?.email;
};

export const selectHasCompletedOnboarding = (state: ApplicationState) => {
  const data = selectUserProfileData(state);

  return data?.hasCompletedOnboarding;
};

export const selectUserWinnings = (state: ApplicationState) => {
  const data = selectUserProfileData(state);

  return data?.winnings;
};

export const selectUserWinningByLotId = (
  state: ApplicationState,
  lotId: LotId,
) => {
  const winnings = selectUserWinnings(state);

  if (!winnings) {
    return null;
  }

  return winnings[lotId];
};
