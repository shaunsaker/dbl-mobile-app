import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { TicketId } from '../store/tickets/models';

export enum Routes {
  signUp = 'signUp',
  signIn = 'signIn',
  onboarding = 'onboarding',
  home = 'home',
  reserveTickets = 'reserveTickets',
  ticketPayment = 'ticketPayment',
  QRCodeScanner = 'QRCodeScanner',
}

export type RouteStackParamList = {
  [Routes.signUp]: undefined;
  [Routes.signIn]: undefined;
  [Routes.onboarding]: undefined;
  [Routes.home]: undefined;
  [Routes.reserveTickets]: undefined;
  [Routes.ticketPayment]: {
    ticketIds: TicketId[];
  };
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
