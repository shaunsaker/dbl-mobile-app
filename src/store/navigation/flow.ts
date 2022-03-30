import { SagaIterator } from 'redux-saga';
import { fork, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { navigate as _navigate } from '../../router';
import { call } from '../../utils/call';
import { navigate, navigateBack } from './actions';

function* onNavigateBackFlow(): SagaIterator {
  yield takeLatest(navigateBack, function* (): SagaIterator {
    yield* call(_navigate);
  });
}

function* onNavigateFlow(): SagaIterator {
  yield takeLatest(
    navigate,
    function* (action: ActionType<typeof navigate>): SagaIterator {
      yield* call(_navigate, action.payload.route, action.payload.props);
    },
  );
}

// istanbul ignore next
export function* navigationFlow(): SagaIterator {
  yield fork(onNavigateBackFlow);
  yield fork(onNavigateFlow);
}
