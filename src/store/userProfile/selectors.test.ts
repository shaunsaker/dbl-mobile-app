import rootReducer, { initialState } from '../reducers';
import { fetchUserProfile } from './actions';
import { makeUserProfileData } from './data';
import { selectUserEmail, selectUsername } from './selectors';

describe('userProfile selectors', () => {
  describe('selectUsername', () => {
    it('returns null when there is no user data', () => {
      const state = initialState;

      expect(selectUsername(state)).toEqual(null);
    });

    it('returns the username', () => {
      const username = 'sakerbos';
      const state = rootReducer(
        initialState,
        fetchUserProfile.success({
          data: makeUserProfileData({ username }),
        }),
      );

      expect(selectUsername(state)).toEqual(username);
    });
  });

  describe('selectUserEmail', () => {
    it('returns null when there is no user data', () => {
      const state = initialState;

      expect(selectUserEmail(state)).toEqual(null);
    });

    it('returns the email', () => {
      const email = 'sakershaun@gmail.com';
      const state = rootReducer(
        initialState,
        fetchUserProfile.success({
          data: makeUserProfileData({ email }),
        }),
      );

      expect(selectUserEmail(state)).toEqual(email);
    });
  });
});
