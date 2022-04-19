import { getUuid } from '../../utils/getUuid';
import { BlockchainAddress } from '../lots/models';
import { UserProfileData, WalletData, Wallets } from './models';

export const makeUserProfileData = ({
  username = '',
  email = '',
  hasCompletedOnboarding = false,
  wallets = {},
  dateCreated = '',
}: {
  username?: string;
  email?: string;
  hasCompletedOnboarding?: boolean;
  wallets?: Wallets;
  dateCreated?: string;
}): UserProfileData => ({
  username,
  email,
  hasCompletedOnboarding,
  wallets,
  dateCreated,
});

export const makeWalletData = ({
  id,
  address = '',
  preferred = true,
}: {
  id?: string;
  address?: BlockchainAddress;
  preferred?: boolean;
}): WalletData => ({
  id: id || getUuid(),
  address,
  preferred,
});
