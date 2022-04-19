import { getTimeAsISOString } from '../../utils/getTimeAsISOString';
import { UserProfileData } from './models';

export const makeUserProfileData = ({
  username = '',
  email = '',
  hasCompletedOnboarding = false,
  dateCreated = getTimeAsISOString(),
}: {
  username?: string;
  email?: string;
  hasCompletedOnboarding?: boolean;
  dateCreated?: string;
}): UserProfileData => ({
  username,
  email,
  hasCompletedOnboarding,
  dateCreated,
});
