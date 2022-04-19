export type Username = string;

export interface UserProfileData {
  dateCreated: string;
  username: Username;
  email: string;
  hasCompletedOnboarding: boolean;
  fcmTokens: string[];
  winnerWithdrawalLink?: string;
}

export interface UserProfileState {
  data: UserProfileData | undefined;
}
