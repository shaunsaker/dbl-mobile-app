import { createAsyncAction } from 'typesafe-actions';
import { Username, UserProfileData } from './models';

export const fetchUserProfile = createAsyncAction(
  'USER_PROFILE/fetchUserProfileRequest',
  'USER_PROFILE/fetchUserProfileSuccess',
  'USER_PROFILE/fetchUserProfileFailure',
)<void, { data: UserProfileData }, Error>();

export const createUser = createAsyncAction(
  'USER_PROFILE/createUserRequest',
  'USER_PROFILE/createUserSuccess',
  'USER_PROFILE/createUserFailure',
)<{ username: Username }, UserProfileData, Error>();

export const editUsername = createAsyncAction(
  'USER_PROFILE/editUsernameRequest',
  'USER_PROFILE/editUsernameSuccess',
  'USER_PROFILE/editUsernameFailure',
)<{ username: Username }, void, Error>();

export const editHasCompletedOnboarding = createAsyncAction(
  'USER_PROFILE/editHasCompletedOnboardingRequest',
  'USER_PROFILE/editHasCompletedOnboardingSuccess',
  'USER_PROFILE/editHasCompletedOnboardingFailure',
)<{ hasCompletedOnboarding: boolean }, void, Error>();
