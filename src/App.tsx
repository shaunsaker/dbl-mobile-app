import 'react-native-gesture-handler';
import React, { ReactElement } from 'react';
import { NotifierWrapper } from 'react-native-notifier';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from './router';
import { persistor, store } from './store';
import { sentry } from './sentry';
import './mixpanel';
import { firebase } from '@react-native-firebase/app-check';
import { Platform } from 'react-native';

// NOTE: AppCheck is initialised on iOS by default
// We pass "ignored" because activate expects an argument
// but does not actually do anything with it on android 🤦‍♂️
if (!__DEV__ && Platform.OS === 'android') {
  firebase.appCheck().activate('ignored');
}

const App = (): ReactElement => {
  // uncomment this if you want to purge the store
  // require('react').useEffect(() => {
  //   persistor.purge();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotifierWrapper>
          <Router />
        </NotifierWrapper>
      </PersistGate>
    </Provider>
  );
};

const WithSentry = sentry.wrap(App);

export { WithSentry as App };
