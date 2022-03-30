import { fork, takeLatest } from '@redux-saga/core/effects';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { SagaIterator } from 'redux-saga';
import { ActionType } from 'typesafe-actions';
import { call } from '../../utils/call';
import { showSnackbar } from './actions';

function* onShowSnackbarFlow(): SagaIterator {
  yield takeLatest(
    showSnackbar,
    function* (action: ActionType<typeof showSnackbar>): SagaIterator {
      yield* call(Notifier.showNotification, {
        title: action.payload.title,
        description: action.payload.description,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: action.payload.type,
        },
        duration: 4000,
      });
    },
  );
}

export function* snackbarsFlow(): SagaIterator {
  yield fork(onShowSnackbarFlow);
}
