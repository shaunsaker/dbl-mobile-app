import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import MockDate from 'mockdate';
import { firebaseUpdateUserProfile } from '../../firebase/firestore/firebaseUpdateUserProfile';
import { signUp } from '../auth/actions';
import rootReducer, { initialState } from '../reducers';
import { createUser } from './actions';
import { makeUserProfileData } from './data';
import { createUserFlow } from './flow';

describe('userProfile flows', () => {
  describe('createUserFlow', () => {
    const today = '2021-12-02';

    beforeEach(() => {
      MockDate.set(today);
    });

    afterEach(() => {
      MockDate.reset();
    });

    it('creates a user', () => {
      const user = {};
      const username = 'sakerbos';
      const data = makeUserProfileData({
        username,
      });

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
});
