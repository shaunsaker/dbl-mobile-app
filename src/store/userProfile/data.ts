import { getUuid } from '../../utils/getUuid';
import { WalletAddress } from '../lots/models';
import { UserProfileData, WalletData, Wallets } from './models';

export const makeUserProfileData = ({
  username = '',
  email = '',
  hasCompletedOnboarding = false,
  wallets = {},
  dateJoined = '',
}: {
  username?: string;
  email?: string;
  hasCompletedOnboarding?: boolean;
  wallets?: Wallets;
  dateJoined?: string;
}): UserProfileData => ({
  username,
  email,
  hasCompletedOnboarding,
  wallets,
  dateJoined,
});

export const makeWalletData = ({
  id,
  address = '',
  preferred = true,
}: {
  id?: string;
  address?: WalletAddress;
  preferred?: boolean;
}): WalletData => ({
  id: id || getUuid(),
  address,
  preferred,
});
