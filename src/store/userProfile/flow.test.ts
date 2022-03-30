import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { firebaseUpdateUserProfile } from '../../firebase/firestore/firebaseUpdateUserProfile';
import { errorSaga } from '../../utils/errorSaga';
import { signUp } from '../auth/actions';
import rootReducer, { initialState } from '../reducers';
import { showSnackbar } from '../snackbars/actions';
import { SnackbarType } from '../snackbars/models';
import { createUser, editUsername } from './actions';
import { makeUserProfileData } from './data';
import { createUserFlow, editUsernameFlow } from './flow';

describe('userProfile flows', () => {
  describe('createUserFlow', () => {
    it('creates a user', () => {
      const user = {};
      const username = 'sakerbos';
      const data = makeUserProfileData({ username });

      return expectSaga(createUserFlow)
        .withReducer(rootReducer)
        .withState(initialState)
        .provide([[matchers.call.fn(firebaseUpdateUserProfile), null]])
        .dispatch(
          signUp.success({
            // @ts-expect-error we don't care what the user looks like
            user,
            username,
          }),
        )
        .put(createUser.request({ username }))
        .call(firebaseUpdateUserProfile, data)
        .put(createUser.success(data))
        .hasFinalState({
          ...initialState,
          // we dispatch signUp.success which updates the auth state
          auth: {
            ...initialState.auth,
            authenticated: true,
            user,
          },
          userProfile: {
            ...initialState.userProfile,
            data,
          },
        })
        .run();
    });
  });

  describe('editUsernameFlow', () => {
    const payload = {
      username: 'sakerbos',
    };

    it('edits the username settings', () => {
      return expectSaga(editUsernameFlow)
        .withReducer(rootReducer)
        .withState(initialState)
        .provide([[matchers.call.fn(firebaseUpdateUserProfile), null]])
        .dispatch(editUsername.request(payload))
        .call(firebaseUpdateUserProfile, payload)
        .put(editUsername.success())
        .put(
          showSnackbar({
            type: SnackbarType.success,
            title: 'Success',
            description: 'We successfully updated your username',
          }),
        )
        .run();
    });

    it('handles errors', () => {
      const error = new Error('You shall not pass!');

      return expectSaga(editUsernameFlow)
        .withReducer(rootReducer)
        .withState(initialState)
        .provide([
          [matchers.call.fn(firebaseUpdateUserProfile), throwError(error)],
        ])
        .dispatch(editUsername.request(payload))
        .call(firebaseUpdateUserProfile, payload)
        .call(errorSaga, error, editUsername.failure)
        .run();
    });
  });
});
