import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export enum Routes {
  signUp = 'signUp',
  signIn = 'signIn',
  onboarding = 'onboarding',
  home = 'home',
  buyTickets = 'buyTickets',
  QRCodeScanner = 'QRCodeScanner',
}

export type RouteStackParamList = {
  [Routes.signUp]: undefined;
  [Routes.signIn]: undefined;
  [Routes.onboarding]: undefined;
  [Routes.home]: undefined;
  [Routes.buyTickets]: undefined;
  [Routes.QRCodeScanner]: undefined;
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
