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

export const updateUserProfile = createAsyncAction(
  'USER_PROFILE/updateUserProfileRequest',
  'USER_PROFILE/updateUserProfileSuccess',
  'USER_PROFILE/updateUserProfileFailure',
)<Partial<UserProfileData>, void, Error>();
