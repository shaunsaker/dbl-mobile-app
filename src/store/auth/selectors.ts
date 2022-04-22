import { ApplicationState } from '../reducers';

export const selectIsAuthenticated = (state: ApplicationState) =>
  state.auth.authenticated;

export const selectHasUserSignedUp = (state: ApplicationState) =>
  Boolean(state.auth.user);

export const selectAuthLoading = (state: ApplicationState) =>
  state.auth.loading;

export const selectUid = (state: ApplicationState) => state.auth.user?.uid;
