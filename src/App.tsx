import React, { ReactElement } from 'react';
import { NotifierWrapper } from 'react-native-notifier';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from './router';
import { persistor, store } from './store';
import { sentry } from './sentry';
import './mixpanel';

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
