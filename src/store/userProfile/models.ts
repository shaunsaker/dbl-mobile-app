export type Username = string;

export interface UserProfileData {
  username: Username;
  email: string;
}

export interface UserProfileState {
  data: UserProfileData | undefined;
}
