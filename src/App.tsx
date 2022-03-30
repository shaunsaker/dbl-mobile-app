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

// TODO: SS test this in production on a real device (the docs are misleading)
if (!__DEV__ && Platform.OS === 'android') {
  // @ts-expect-error activate only expects an arg on iOS (which is activated by default)
  firebase.appCheck().activate();
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
