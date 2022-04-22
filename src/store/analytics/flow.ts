import { fork, takeLatest } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { mixpanel } from '../../mixpanel';
import { selectUid } from '../auth/selectors';
import { select } from '../../utils/typedSelect';
import { ActionType, getType } from 'typesafe-actions';
import { navigate } from '../navigation/actions';
import { AnalyticsEvent } from './models';

export function* identifyUserFlow(): SagaIterator {
  const uid = yield* select(selectUid);

  if (uid) {
    mixpanel.identify(uid);
  }
}

export function* onNavigateFlow(): SagaIterator {
  yield takeLatest(
    getType(navigate),
    function* (action: ActionType<typeof navigate>): SagaIterator {
      const route = action.payload.route;

      mixpanel.track(AnalyticsEvent.navigate, { route });
    },
  );
}

export function* analyticsFlow(): SagaIterator {
  yield fork(identifyUserFlow);
  yield fork(onNavigateFlow);
}
