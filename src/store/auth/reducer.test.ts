import { REHYDRATE } from 'redux-persist';
import rootReducer, { initialState } from '../reducers';
import { signIn } from './actions';

describe('auth reducer', () => {
  it('resets loading and existing user data on REHYDRATE', () => {
    // set loading to true
    let state = rootReducer(
      initialState,
      signIn.request({ email: 'sakershaun@gmail.com', password: '123123' }),
    );

    // dispatch the REHYDRATE action

    const user = { email: 'sakershaun@gmail.com' };

    state = rootReducer(state, {
      // @ts-expect-error action type is correct
      type: REHYDRATE,
      // @ts-expect-error a partial match is fine for our use case
      payload: { auth: { user } },
    });

    expect(state.auth.loading).toEqual(false);
    expect(state.auth.user).toEqual(user);
  });
});
