import { LotId } from '../lots/models';
import { ApplicationState } from '../reducers';

export const selectUserProfileDataLoading = (state: ApplicationState) => {
  return state.userProfile.loading;
};

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

export const selectUserTestimonials = (state: ApplicationState) => {
  const data = selectUserProfileData(state);

  return data?.testimonials;
};

export const selectUserTestimonialByLotId = (
  state: ApplicationState,
  lotId: LotId,
) => {
  const testimonials = selectUserTestimonials(state);

  if (!testimonials) {
    return null;
  }

  return testimonials[lotId];
};
