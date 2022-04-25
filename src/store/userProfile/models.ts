import { LotId } from '../lots/models';

export type UserId = string;

export type Username = string;

export type UserWinnings = {
  [key: LotId]: {
    link: string;
    hasSeenLink: boolean;
  };
};

export interface UserProfileData {
  dateCreated: string;
  username: Username;
  email: string;
  hasCompletedOnboarding: boolean;
  fcmTokens: string[];
  winnings?: UserWinnings;
}

export interface UserProfileState {
  data: UserProfileData | undefined;
}
