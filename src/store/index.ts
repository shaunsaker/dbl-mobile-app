import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';

import reducers, { ApplicationState } from './reducers';
import sagas from './sagas';

// add the middlewares
const middlewares = [];

// add the saga middlewared
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

// apply the middleware
const middleware = applyMiddleware(...middlewares);

const persistConfig: PersistConfig<ApplicationState> = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: [],
  // @ts-expect-error fixes https://github.com/rt2zz/redux-persist/issues/717
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, middleware);

// @ts-ignore dispatch types are compatible
export const persistor = persistStore(store);

sagaMiddleware.run(sagas);
