import { fork } from 'redux-saga/effects';
import { connectSaga } from '../utils/connectSaga';
import { select } from '../utils/typedSelect';
import { authSagas } from './auth/flow';
import { selectIsAuthenticated } from './auth/selectors';

import { navigationFlow } from './navigation/flow';
import { snackbarsFlow } from './snackbars/flow';
import { createUserFlow, userProfileFlow } from './userProfile/flow';
import { analyticsFlow } from './analytics/flow';
import { lotsFlow } from './lots/flow';

function* omnipresentFlows() {
  yield fork(authSagas);
  yield fork(navigationFlow);
  yield fork(snackbarsFlow);
  yield fork(createUserFlow); // user may not be authenticated in the store by this stage
}

function* authenticatedFlows() {
  const isAuthenticated = yield* select(selectIsAuthenticated);
  if (isAuthenticated) {
    yield fork(userProfileFlow);
    yield fork(analyticsFlow);
    yield fork(lotsFlow);
  }
}

function* rootSaga() {
  yield fork(omnipresentFlows);
  yield fork(() => connectSaga(selectIsAuthenticated, authenticatedFlows));
}

export default rootSaga;
