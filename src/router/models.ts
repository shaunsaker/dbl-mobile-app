import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { InvoiceId } from '../store/invoices/models';
import { LotId } from '../store/lots/models';

export enum Routes {
  signUp = 'Sign Up',
  signIn = 'Sign In',
  onboarding = 'Onboarding',
  drawer = 'Drawer',
  home = 'Home',
  reserveTickets = 'Reserve Tickets',
  invoice = 'Invoice',
  results = 'Results',
  result = 'Result',
  winner = 'Winner',
}

export type RouteStackParamList = {
  [Routes.signUp]: undefined;
  [Routes.signIn]: undefined;
  [Routes.onboarding]: undefined;
  [Routes.drawer]: undefined;
  [Routes.home]: undefined;
  [Routes.reserveTickets]: undefined;
  [Routes.invoice]: {
    lotId: LotId;
    invoiceId: InvoiceId;
  };
  [Routes.results]: undefined;
  [Routes.result]: {
    lotId: LotId;
  };
  [Routes.winner]: {
    lotId: LotId;
  };
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
