import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { firebaseResetPassword } from '../../firebase/auth/firebaseResetPassword';
import { firebaseSignIn } from '../../firebase/auth/firebaseSignIn';
import { firebaseSignOut } from '../../firebase/auth/firebaseSignOut';
import { firebaseSignup } from '../../firebase/auth/firebaseSignUp';
import { errorSaga } from '../../utils/errorSaga';
import rootReducer, { initialState } from '../reducers';
import { showSnackbar } from '../snackbars/actions';
import { SnackbarType } from '../snackbars/models';
import { resetPassword, signIn, signOut, signUp } from './actions';

import { resetPasswordSaga, signInSaga, signOutSaga, signUpSaga } from './flow';

describe('auth flows', () => {
  it('signUpSaga', () => {
    const payload = {
      username: 'sakerbos',
      email: 'sakershaun@gmail.com',
      password: '123123',
    };
    const user = { email: payload.email };

    return (
      expectSaga(signUpSaga)
        .withState(initialState)
        .withReducer(rootReducer)
        .provide([[matchers.call.fn(firebaseSignup), user]])
        .dispatch(signUp.request(payload))
        .call(firebaseSignup, payload)
        .put(
          signUp.success({
            // @ts-expect-error we don't care what the user looks like
            user,
            username: payload.username,
          }),
        )
        .put(
          showSnackbar({
            type: SnackbarType.success,
            title: 'Success',
            description: 'You were signed up succesfully.',
          }),
        )
        // check that the store was actually updated
        .hasFinalState({
          ...initialState,
          auth: {
            ...initialState.auth,
            authenticated: true,
            user,
          },
        })
        .run()
    );
  });

  it('signUpSaga handles errors', () => {
    const payload = {
      username: 'sakerbos',
      email: 'sakershaun@gmail.com',
      password: '123123',
    };

    const error = new Error('This user already exists.');

    return expectSaga(signUpSaga)
      .withState(initialState)
      .withReducer(rootReducer)
      .provide([[matchers.call.fn(firebaseSignup), throwError(error)]])
      .dispatch(signUp.request(payload))
      .call(firebaseSignup, payload)
      .call(errorSaga, error, signUp.failure)
      .hasFinalState({
        ...initialState,
        auth: {
          ...initialState.auth,
          loading: false,
        },
      })
      .run();
  });

  it('signInSaga', () => {
    const payload = {
      email: 'sakershaun@gmail.com',
      password: '123123',
    };
    const user = { email: payload.email };

    return expectSaga(signInSaga)
      .withState(initialState)
      .withReducer(rootReducer)
      .provide([[matchers.call.fn(firebaseSignIn), user]])
      .dispatch(signIn.request(payload))
      .call(firebaseSignIn, payload)
      .put(
        signIn.success(
          // @ts-expect-error we don't care what the user looks like
          user,
        ),
      )
      .put(
        showSnackbar({
          type: SnackbarType.success,
          title: 'Success',
          description: 'You were signed in succesfully.',
        }),
      )
      .hasFinalState({
        ...initialState,
        auth: {
          ...initialState.auth,
          authenticated: true,
          user,
        },
      })
      .run();
  });

  it('signInSaga handles errors', () => {
    const payload = {
      username: 'sakerbos',
      email: 'sakershaun@gmail.com',
      password: '123123',
    };

    const error = new Error('This user does not exist.');

    return expectSaga(signInSaga)
      .withState(initialState)
      .withReducer(rootReducer)
      .provide([[matchers.call.fn(firebaseSignIn), throwError(error)]])
      .dispatch(signIn.request(payload))
      .call(firebaseSignIn, payload)
      .call(errorSaga, error, signIn.failure)
      .hasFinalState({
        ...initialState,
        auth: {
          ...initialState.auth,
          loading: false,
        },
      })
      .run();
  });

  it('resetPasswordSaga', () => {
    const payload = {
      email: 'sakershaun@gmail.com',
    };

    return expectSaga(resetPasswordSaga)
      .provide([[matchers.call.fn(firebaseResetPassword), null]])
      .dispatch(resetPassword.request(payload))
      .call(firebaseResetPassword, payload)
      .put(resetPassword.success())
      .put(
        showSnackbar({
          type: SnackbarType.success,
          title: 'Success',
          description: 'We sent you a password reset email succesfully.',
        }),
      )
      .run();
  });

  it('resetPasswordSaga handles errors', () => {
    const payload = {
      email: 'sakershaun@gmail.com',
    };

    const error = new Error('This user does not exist.');

    return expectSaga(resetPasswordSaga)
      .withState(initialState)
      .withReducer(rootReducer)
      .provide([[matchers.call.fn(firebaseResetPassword), throwError(error)]])
      .dispatch(resetPassword.request(payload))
      .call(firebaseResetPassword, payload)
      .call(errorSaga, error, resetPassword.failure)
      .hasFinalState({
        ...initialState,
        auth: {
          ...initialState.auth,
          loading: false,
        },
      })
      .run();
  });

  it('signOutSaga', () => {
    const user = { email: 'sakershaun@gmail.com' };
    // @ts-expect-error we don't care what the user looks like
    const state = rootReducer(initialState, signIn.success(user));

    return expectSaga(signOutSaga)
      .withReducer(rootReducer)
      .withState(state)
      .provide([[matchers.call.fn(firebaseSignOut), null]])
      .dispatch(signOut.request())
      .call(firebaseSignOut)
      .put(signOut.success())
      .put(
        showSnackbar({
          type: SnackbarType.success,
          title: 'Success',
          description: 'You were signed out succesfully.',
        }),
      )
      .hasFinalState({
        ...initialState,
        auth: {
          ...initialState.auth,
          authenticated: false,
          user, // the user data stays
        },
      })
      .run();
  });

  it('signOutSaga handles errors', () => {
    const error = new Error('Dont leave me!');

    return expectSaga(signOutSaga)
      .withState(initialState)
      .withReducer(rootReducer)
      .provide([[matchers.call.fn(firebaseSignOut), throwError(error)]])
      .dispatch(signOut.request())
      .call(firebaseSignOut)
      .call(errorSaga, error, signOut.failure)
      .hasFinalState({
        ...initialState,
        auth: {
          ...initialState.auth,
          loading: false,
        },
      })
      .run();
  });
});
