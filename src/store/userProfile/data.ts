import { UserProfileData } from './models';

export const makeUserProfileData = ({
  username = '',
  email = '',
}: {
  username?: string;
  email?: string;
}): UserProfileData => ({
  username,
  email,
});
