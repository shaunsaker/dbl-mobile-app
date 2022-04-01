import { objectToArray } from '../../utils/objectToArray';
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

export const selectUserWallets = (state: ApplicationState) => {
  if (!state.userProfile.data) {
    return {};
  }

  if (!state.userProfile.data.wallets) {
    return {};
  }

  return state.userProfile.data.wallets;
};

export const selectPreferredUserWallet = (state: ApplicationState) => {
  const userWallets = selectUserWallets(state);
  const preferredUserWallet = objectToArray(userWallets).filter(
    wallet => wallet.preferred,
  )[0];

  return preferredUserWallet;
};
