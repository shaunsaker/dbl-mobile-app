import React, { createRef, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
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
import { QRCodeScanner } from '../pages/QRCodeScanner';
import { ReserveTickets } from '../pages/ReserveTickets';

const Stack = createStackNavigator<RouteStackParamList>();

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
            <Stack.Group key="authenticatedScreens">
              {!hasCompletedOnboarding && (
                <Stack.Screen name={Routes.onboarding} component={Onboarding} />
              )}

              <Stack.Group key="pages">
                <Stack.Screen name={Routes.home} component={Home} />
              </Stack.Group>

              <Stack.Group
                key="modals"
                screenOptions={{
                  presentation: 'transparentModal',
                }}
              >
                <Stack.Screen
                  name={Routes.reserveTickets}
                  component={ReserveTickets}
                />

                <Stack.Screen
                  name={Routes.QRCodeScanner}
                  component={QRCodeScanner}
                />
              </Stack.Group>
            </Stack.Group>
          ) : hasSignedUp ? (
            <Stack.Group key="unauthenticatedScreens">
              <Stack.Screen name={Routes.signIn} component={SignIn} />

              <Stack.Screen name={Routes.signUp} component={SignUp} />
            </Stack.Group>
          ) : (
            <Stack.Group key="unauthenticatedScreens">
              <Stack.Screen name={Routes.signUp} component={SignUp} />

              <Stack.Screen name={Routes.signIn} component={SignIn} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
