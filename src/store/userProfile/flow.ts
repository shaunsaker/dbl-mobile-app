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
import { Routes } from '../../router/models';
import { call } from '../../utils/call';
import { errorSaga } from '../../utils/errorSaga';
import { getTimeAsISOString } from '../../utils/getTimeAsISOString';
import { select } from '../../utils/typedSelect';
import { signOut, signUp } from '../auth/actions';
import { selectUid } from '../auth/selectors';
import { LotId } from '../lots/models';
import { navigate } from '../navigation/actions';
import { showSnackbar } from '../snackbars/actions';
import { SnackbarType } from '../snackbars/models';
import { fetchUserProfile, createUser, updateUserProfile } from './actions';
import { makeUserProfileData } from './data';
import { UserProfileData, UserWinnings } from './models';
import { selectUserWinnings } from './selectors';

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

export function* checkUserWinnerFlow(): SagaIterator {
  yield takeLatest(fetchUserProfile.success, function* () {
    // check if there is a winning that has not been seen
    const userWinnings = yield* select(selectUserWinnings);

    if (!userWinnings) {
      return;
    }

    let winningLotId = '';
    Object.keys(userWinnings).forEach(lotId => {
      if (!userWinnings[lotId].hasSeenLink) {
        // we assign to a variable here because we can't call a saga directly in the loop
        winningLotId = lotId;
      }
    });

    if (!winningLotId) {
      return;
    }

    yield put(
      navigate({ route: Routes.winner, props: { lotId: winningLotId } }),
    );

    // toggle hasSeenLink so that we don't show the Winner modal automatically again
    const newWinnings: UserWinnings = {
      ...userWinnings,
      [winningLotId]: {
        ...userWinnings[winningLotId],
        hasSeenLink: true,
      },
    };
    yield* call(firebaseUpdateUserProfile, {
      winnings: newWinnings,
    });
  });
}

export function* userProfileFlow(): SagaIterator {
  yield fork(fetchUserProfileFlow);
  yield fork(updateUserProfileFlow);
  yield fork(checkUserWinnerFlow);
}
