import { firebase } from '@react-native-firebase/auth';
import { SagaIterator } from 'redux-saga';
import { fork, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';
import { firebaseGetMessagingToken } from '../../firebase/messaging/firebaseGetMessagingToken';
import { firebaseRequestMessagingPermission } from '../../firebase/messaging/firebaseRequestMessagingPermission';
import { firebaseSubscribeToMessagingTopic } from '../../firebase/messaging/firebaseSubscribeToMessagingTopic';
import { FirebaseMessagingTopic } from '../../firebase/messaging/models';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { fetchUserProfile, updateUserProfile } from '../userProfile/actions';

function* requestNotificationPermissionFlow(): SagaIterator {
  const authorisationStatus = yield* call(firebaseRequestMessagingPermission);

  return (
    authorisationStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED
  );
}

function* registerDeviceForNotificationsFlow(
  fcmTokens: string[] = [],
): SagaIterator {
  // get the fcm token
  const deviceFcmToken = yield* call(firebaseGetMessagingToken);
  console.log('HERE', deviceFcmToken);
  const savedFcmTokens = fcmTokens;

  if (!savedFcmTokens.includes(deviceFcmToken)) {
    // if it's different to what's in user profile data, save it
    const newFcmTokens = [...savedFcmTokens, deviceFcmToken];
    yield put(
      updateUserProfile.request({
        data: { fcmTokens: newFcmTokens },
        showSnackbar: false,
      }),
    );
  }
}

function* subscribeDeviceToNotificationTopicsFlow(): SagaIterator {
  // register for the winner topic
  yield* call(firebaseSubscribeToMessagingTopic, FirebaseMessagingTopic.winner);
}

export function* notificationsSetupFlow(): SagaIterator {
  yield takeLatest(
    getType(fetchUserProfile.success),
    function* (
      action: ActionType<typeof fetchUserProfile.success>,
    ): SagaIterator {
      try {
        // once we have the user profile data
        // request notifications permission if need be
        const hasNotificationsPermission = yield* call(
          requestNotificationPermissionFlow,
        );

        if (!hasNotificationsPermission) {
          // fail silently
          return;
        }

        yield* call(
          registerDeviceForNotificationsFlow,
          action.payload.data.fcmTokens,
        );

        yield* call(subscribeDeviceToNotificationTopicsFlow);
      } catch (error) {
        yield* call(errorSaga, error);
      }
    },
  );
}

export function* notificationsFlow(): SagaIterator {
  yield fork(notificationsSetupFlow);
}
