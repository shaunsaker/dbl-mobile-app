import { createStandardAction } from 'typesafe-actions';

export const setHasCompletedOnboarding = createStandardAction(
  'ONBOARDING/setHasCompletedOnboarding',
)<{
  hasCompletedOnboarding: boolean;
}>();
