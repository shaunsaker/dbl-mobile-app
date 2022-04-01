import { getUuid } from '../../utils/getUuid';
import { WalletAddress } from '../lots/models';
import { UserProfileData, WalletData, Wallets } from './models';

export const makeUserProfileData = ({
  username = '',
  email = '',
  hasCompletedOnboarding = false,
  wallets = {},
}: {
  username?: string;
  email?: string;
  hasCompletedOnboarding?: boolean;
  wallets?: Wallets;
}): UserProfileData => ({
  username,
  email,
  hasCompletedOnboarding,
  wallets,
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
