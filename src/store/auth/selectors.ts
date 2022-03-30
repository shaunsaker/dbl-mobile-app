import { ApplicationState } from '../reducers';

// istanbul ignore next - is covered in flow tests
export const selectIsAuthenticated = (state: ApplicationState) =>
  state.auth.authenticated;

// istanbul ignore next - is covered in flow tests
export const selectHasUserSignedUp = (state: ApplicationState) =>
  Boolean(state.auth.user);

// istanbul ignore next - is covered in flow tests
export const selectAuthLoading = (state: ApplicationState) =>
  state.auth.loading;

export const selectUid = (state: ApplicationState) => state.auth.user?.uid;
