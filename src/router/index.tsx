import React, { createRef, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/auth/selectors';
import { SignIn } from '../pages/SignIn';
import { Routes, RouteStackParamList } from './models';
import {
  selectHasCompletedOnboarding,
  selectUsername,
} from '../store/userProfile/selectors';
import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';
import { Onboarding } from '../pages/Onboarding';
import { QuitOnboardingModal } from '../modals/QuitOnboardingModal';
import { EditWalletModal } from '../modals/EditWalletModal';
import { QRCodeScannerModal } from '../modals/QRCodeScannerModal';

const Stack = createStackNavigator<RouteStackParamList>();

const RootTabs = createBottomTabNavigator<RouteStackParamList>();

const navigationRef = createRef<NavigationContainerRef<RouteStackParamList>>();

export const navigateInternal = (
  name?: keyof RouteStackParamList,
  params?: RouteStackParamList[keyof RouteStackParamList],
) => {
  if (navigationRef.current) {
    if (!name) {
      // goBack
      navigationRef.current.goBack();
    } else {
      navigationRef.current.navigate(name, params);
    }
  }
};

const RootTabsComponent = () => (
  <RootTabs.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={() => null}
  >
    <RootTabs.Screen name={Routes.dashboard} component={Home} />
  </RootTabs.Navigator>
);

export const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hasSignedUp = Boolean(useSelector(selectUsername));
  const hasCompletedOnboarding = useSelector(selectHasCompletedOnboarding);

  useEffect(() => {
    enableScreens();
  }, []);

  // FIXME: there must be a better way to handle hasSignedUp route order

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isAuthenticated ? (
            <>
              {!hasCompletedOnboarding && (
                <Stack.Screen name={Routes.onboarding} component={Onboarding} />
              )}

              <Stack.Group key="pages">
                <Stack.Screen
                  name={Routes.homeTabs}
                  component={RootTabsComponent}
                />
              </Stack.Group>

              <Stack.Group
                key="modals"
                screenOptions={{
                  presentation: 'transparentModal',
                }}
              >
                {!hasCompletedOnboarding && (
                  <Stack.Screen
                    name={Routes.quitOnboardingModal}
                    component={QuitOnboardingModal}
                  />
                )}

                <Stack.Screen
                  name={Routes.editWalletModal}
                  component={EditWalletModal}
                />

                <Stack.Screen
                  name={Routes.QRScannerModal}
                  component={QRCodeScannerModal}
                />
              </Stack.Group>
            </>
          ) : hasSignedUp ? (
            <>
              <Stack.Screen name={Routes.signIn} component={SignIn} />

              <Stack.Screen name={Routes.signUp} component={SignUp} />
            </>
          ) : (
            <>
              <Stack.Screen name={Routes.signUp} component={SignUp} />

              <Stack.Screen name={Routes.signIn} component={SignIn} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
