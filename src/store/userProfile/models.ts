import { Timestamp } from '../models';

export type Username = string;

export interface UserProfileData {
  username: Username;
  email: string;
  hasCompletedOnboarding: boolean;
  dateCreated: Timestamp;
}

export interface UserProfileState {
  data: UserProfileData | undefined;
}
