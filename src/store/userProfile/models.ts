import { WalletAddress } from '../lots/models';

export type Username = string;

export type WalletId = string;

export type WalletData = {
  id: WalletId;
  address: WalletAddress;
  preferred: boolean;
};

export type Wallets = Record<WalletId, WalletData>;

export interface UserProfileData {
  username: Username;
  email: string;
  hasCompletedOnboarding: boolean;
  wallets: Wallets;
}

export interface UserProfileState {
  data: UserProfileData | undefined;
}
