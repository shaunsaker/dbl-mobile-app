import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlockchainAddress } from '../store/lots/models';
import { WalletId } from '../store/userProfile/models';

export enum Routes {
  signUp = 'signUp',
  signIn = 'signIn',
  onboarding = 'onboarding',
  quitOnboardingModal = 'quitOnboardingModal',
  homeTabs = 'homeTabs',
  dashboard = 'dashboard',
  editWalletModal = 'editWalletModal',
  QRScannerModal = 'QRScannerModal',
}

export type RouteStackParamList = {
  [Routes.signUp]: undefined;
  [Routes.signIn]: undefined;
  [Routes.onboarding]: undefined;
  [Routes.quitOnboardingModal]: undefined;
  [Routes.homeTabs]: undefined;
  [Routes.dashboard]: undefined;
  [Routes.editWalletModal]: {
    walletId?: WalletId;
    QRCodeScannerWalletAddress?: BlockchainAddress;
  };
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
