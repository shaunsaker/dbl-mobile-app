import { createAsyncAction } from 'typesafe-actions';
import { WalletAddress } from '../lots/models';
import { Username, UserProfileData, WalletId } from './models';

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

export const addUserWalletAddress = createAsyncAction(
  'USER_PROFILE/addUserWalletAddressRequest',
  'USER_PROFILE/addUserWalletAddressSuccess',
  'USER_PROFILE/addUserWalletAddressFailure',
)<{ address: WalletAddress }, void, Error>();

export const editUserWallet = createAsyncAction(
  'USER_PROFILE/editUserWalletRequest',
  'USER_PROFILE/editUserWalletSuccess',
  'USER_PROFILE/editUserWalletFailure',
)<
  { id: WalletId; address?: WalletAddress; preferred?: boolean },
  void,
  Error
>();
