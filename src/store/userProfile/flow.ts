import {
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { ActionType, getType } from 'typesafe-actions';
import { firebaseSyncUserProfile } from '../../firebase/firestore/firebaseSyncUserProfile';
import { firebaseUpdateUserProfile } from '../../firebase/firestore/firebaseUpdateUserProfile';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { getTimeAsISOString } from '../../utils/getTimeAsISOString';
import { select } from '../../utils/typedSelect';
import { signOut, signUp } from '../auth/actions';
import { selectUid } from '../auth/selectors';
import { showSnackbar } from '../snackbars/actions';
import { SnackbarType } from '../snackbars/models';
import { fetchUserProfile, createUser, updateUserProfile } from './actions';
import { makeUserProfileData } from './data';
import { UserProfileData } from './models';

// istanbul ignore next
function* fetchUserProfileFlow(): SagaIterator {
  yield put(fetchUserProfile.request());

  try {
    const uid = yield* select(selectUid);

    if (!uid) {
      // FIXME: can I just throw here and let the catch handle the error?
      yield* call(
        errorSaga,
        new Error('No user is currently signed in'),
        fetchUserProfile.failure,
      );

      return;
    }

    // FIXME: handle errors here, .e.g by disabling this in Firebase security rules
    const channel = yield* call(firebaseSyncUserProfile, uid);

    yield takeEvery(channel, function* (userProfileData: UserProfileData) {
      yield put(
        fetchUserProfile.success({
          data: userProfileData,
        }),
      );
    });

    yield take(signOut.success);

    channel.close();
  } catch (error) {
    yield* call(errorSaga, error, fetchUserProfile.failure);
  }
}

export function* createUserFlow(): SagaIterator {
  yield takeLatest(
    getType(signUp.success),
    function* (action: ActionType<typeof signUp.success>): SagaIterator {
      const username = action.payload.username;

      yield put(createUser.request({ username }));

      try {
        const data = makeUserProfileData({
          username,
          email: action.payload.user.email || '',
          dateCreated: getTimeAsISOString(),
        });

        yield* call(firebaseUpdateUserProfile, data);

        yield put(createUser.success(data));
      } catch (error) {
        // istanbul ignore next I can't seem to get this test to throw the error
        yield* call(errorSaga, error, createUser.failure);
      }
    },
  );
}

export function* updateUserProfileFlow(): SagaIterator {
  yield takeLatest(
    getType(updateUserProfile.request),
    function* (
      action: ActionType<typeof updateUserProfile.request>,
    ): SagaIterator {
      try {
        yield* call(firebaseUpdateUserProfile, {
          ...action.payload,
        });

        yield put(updateUserProfile.success());

        yield put(
          showSnackbar({
            type: SnackbarType.success,
            title: 'Success',
            description: 'We successfully updated your profile.',
          }),
        );
      } catch (error) {
        yield* call(errorSaga, error, updateUserProfile.failure);
      }
    },
  );
}

// istanbul ignore next
export function* userProfileFlow(): SagaIterator {
  yield fork(fetchUserProfileFlow);
  yield fork(updateUserProfileFlow);
}
