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

export function* notificationsSetupFlow(): SagaIterator {
  yield takeLatest(
    getType(fetchUserProfile.success),
    function* (
      action: ActionType<typeof fetchUserProfile.success>,
    ): SagaIterator {
      try {
        // once we have the user profile data
        // request notifications permission if need be
        const authorisationStatus = yield* call(
          firebaseRequestMessagingPermission,
        );

        if (
          authorisationStatus ===
          firebase.messaging.AuthorizationStatus.AUTHORIZED
        ) {
          // get the fcm token
          const deviceFcmToken = yield* call(firebaseGetMessagingToken);
          const savedFcmTokens = action.payload.data.fcmTokens || [];

          if (!savedFcmTokens.includes(deviceFcmToken)) {
            // if it's different to what's in user profile data, save it
            const newFcmTokens = [...savedFcmTokens, deviceFcmToken];
            yield put(updateUserProfile.request({ fcmTokens: newFcmTokens }));
          }

          // register for the winner topic
          yield* call(
            firebaseSubscribeToMessagingTopic,
            FirebaseMessagingTopic.winner,
          );
        } else {
          // don't do anything, if the user doesn't want notifications, that's their prerogative
        }
      } catch (error) {
        yield* call(errorSaga, error);
      }
    },
  );
}

// istanbul ignore next
export function* notificationsFlow(): SagaIterator {
  yield fork(notificationsSetupFlow);
}
