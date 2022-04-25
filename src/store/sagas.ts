import { fork } from 'redux-saga/effects';
import { connectSaga } from '../utils/connectSaga';
import { select } from '../utils/typedSelect';
import { authFlow } from './auth/flow';
import { selectIsAuthenticated } from './auth/selectors';

import { navigationFlow } from './navigation/flow';
import { snackbarsFlow } from './snackbars/flow';
import { createUserFlow, userProfileFlow } from './userProfile/flow';
import { analyticsFlow } from './analytics/flow';
import { lotsFlow } from './lots/flow';
import { ticketsFlow } from './tickets/flow';
import { notificationsFlow } from './notifications/flow';
import { btcRateFlow } from './btcRate/flow';
import { invoicesFlow } from './invoices/flow';
import { paymentsFlow } from './payments/flow';

function* omnipresentFlows() {
  yield fork(authFlow);
  yield fork(createUserFlow); // user may not be authenticated in the store by this stage
  yield fork(navigationFlow);
  yield fork(snackbarsFlow);
}

function* authenticatedFlows() {
  const isAuthenticated = yield* select(selectIsAuthenticated);
  if (isAuthenticated) {
    yield fork(analyticsFlow);
    yield fork(btcRateFlow);
    yield fork(invoicesFlow);
    yield fork(lotsFlow);
    yield fork(notificationsFlow);
    yield fork(paymentsFlow);
    yield fork(ticketsFlow);
    yield fork(userProfileFlow);
  }
}

function* rootSaga() {
  yield fork(omnipresentFlows);
  yield fork(() => connectSaga(selectIsAuthenticated, authenticatedFlows));
}

export default rootSaga;
