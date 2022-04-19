import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export enum Routes {
  signUp = 'signUp',
  signIn = 'signIn',
  onboarding = 'onboarding',
  quitOnboardingModal = 'quitOnboardingModal',
  homeTabs = 'homeTabs',
  dashboard = 'dashboard',
  QRScannerModal = 'QRScannerModal',
}

export type RouteStackParamList = {
  [Routes.signUp]: undefined;
  [Routes.signIn]: undefined;
  [Routes.onboarding]: undefined;
  [Routes.quitOnboardingModal]: undefined;
  [Routes.homeTabs]: undefined;
  [Routes.dashboard]: undefined;
  [Routes.QRScannerModal]: undefined;
};

type ScreenNavigationProps<T extends Routes> = StackNavigationProp<
  RouteStackParamList,
  T
>;

type ScreenRouteProps<T extends Routes> = RouteProp<RouteStackParamList, T>;

export type RouteProps<T extends Routes> = {
  navigation: ScreenNavigationProps<T>;
  route: ScreenRouteProps<T>;
};
