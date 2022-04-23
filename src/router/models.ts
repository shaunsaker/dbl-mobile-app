import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { LotId } from '../store/lots/models';
import { TicketId } from '../store/tickets/models';

export enum Routes {
  signUp = 'Sign Up',
  signIn = 'Sign In',
  onboarding = 'Onboarding',
  drawer = 'Drawer',
  home = 'Home',
  reserveTickets = 'Reserve Tickets',
  ticketPayment = 'Ticket Payment',
  QRCodeScanner = 'QR Code Scanner',
}

export type RouteStackParamList = {
  [Routes.signUp]: undefined;
  [Routes.signIn]: undefined;
  [Routes.onboarding]: undefined;
  [Routes.drawer]: undefined;
  [Routes.home]: undefined;
  [Routes.reserveTickets]: undefined;
  [Routes.ticketPayment]: {
    lotId: LotId;
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
