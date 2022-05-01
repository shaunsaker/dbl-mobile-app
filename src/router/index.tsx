import React, { createRef, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import {
  selectHasUserSignedUp,
  selectIsAuthenticated,
} from '../store/auth/selectors';
import { SignIn } from '../pages/SignIn';
import { Routes, RouteStackParamList } from './models';
import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';
import { Onboarding } from '../pages/Onboarding';
import { ReserveTickets } from '../pages/ReserveTickets';
import { Invoice } from '../pages/Invoice';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from '../components/CustomDrawer';
import { Results } from '../pages/Results';
import { Result } from '../pages/Result';
import { Winner } from '../pages/Winner';
import { Profile } from '../pages/Profile';
import { Welcome } from '../pages/Welcome';
import { selectHasCompletedOnboarding } from '../store/onboarding/selectors';

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

const Stack = createStackNavigator<RouteStackParamList>();
const Drawer = createDrawerNavigator<RouteStackParamList>();

const DrawerScreens = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
    }}
    drawerContent={CustomDrawer}
  >
    <Drawer.Screen name={Routes.home} component={Home} />

    <Drawer.Screen name={Routes.results} component={Results} />

    <Drawer.Screen name={Routes.profile} component={Profile} />
  </Drawer.Navigator>
);

export const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hasSignedUp = useSelector(selectHasUserSignedUp);
  const hasCompletedOnboarding = useSelector(selectHasCompletedOnboarding);
  const initialRouteName = isAuthenticated
    ? Routes.drawer
    : !hasCompletedOnboarding
    ? Routes.welcome
    : hasSignedUp
    ? Routes.signIn
    : Routes.signUp;

  useEffect(() => {
    enableScreens();
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={initialRouteName}
        >
          {!hasCompletedOnboarding && (
            <Stack.Group key="onboardingScreens">
              <Stack.Screen name={Routes.welcome} component={Welcome} />

              <Stack.Screen name={Routes.onboarding} component={Onboarding} />
            </Stack.Group>
          )}

          {!isAuthenticated && (
            <Stack.Group key="unauthenticatedScreens">
              {hasSignedUp ? (
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
            </Stack.Group>
          )}

          {isAuthenticated && (
            <Stack.Group key="authenticatedScreens">
              <Stack.Screen name={Routes.drawer} component={DrawerScreens} />

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

                <Stack.Screen name={Routes.invoice} component={Invoice} />

                <Stack.Screen name={Routes.result} component={Result} />

                <Stack.Screen name={Routes.winner} component={Winner} />
              </Stack.Group>
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
