import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ApplicationState } from '../store/reducers';

import { configureTestStore } from './configureTestStore';

const Stack = createStackNavigator();

export const renderComponent = (
  component: ReactElement,
  initialState?: ApplicationState,
) => {
  const { store } = configureTestStore(initialState);
  const componentWithWrapper = (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="testRoute">{() => component}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
  const renderProps = render(componentWithWrapper);

  return { ...renderProps, store };
};
