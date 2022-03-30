import { REHYDRATE } from 'redux-persist';
import { ActionType, getType } from 'typesafe-actions';
import { resetPassword, signIn, signOut, signUp } from './actions';
import { AuthState } from './models';

const reducerActions = {
  signUpRequest: signUp.request,
  signUpSuccess: signUp.success,
  signUpFailure: signUp.failure,
  signInRequest: signIn.request,
  signInSuccess: signIn.success,
  signInFailure: signIn.failure,
  forgotPasswordRequest: resetPassword.request,
  forgotPasswordSuccess: resetPassword.success,
  forgotPasswordFailure: resetPassword.failure,
  signOutRequest: signOut.request,
  signOutSuccess: signOut.success,
  signOutFailure: signOut.failure,
};

export const initialState: AuthState = {
  loading: false,
  authenticated: false,
  user: undefined,
};

export const authReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): AuthState => {
  switch (action.type) {
    // @ts-expect-error action type is correct
    case REHYDRATE:
      return {
        ...state,
        // @ts-expect-error payload exists
        ...action.payload?.auth,
        loading: false,
      };

    case getType(signUp.request):
    case getType(signIn.request):
    case getType(resetPassword.request):
    case getType(signOut.request):
      return {
        ...state,
        loading: true,
      };
    case getType(signUp.failure):
    case getType(signIn.failure):
    case getType(resetPassword.success):
    case getType(resetPassword.failure):
    case getType(signOut.failure):
      return {
        ...state,
        loading: false,
      };
    case getType(signUp.success):
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        loading: false,
      };

    case getType(signIn.success):
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false,
      };

    case getType(signOut.success):
      return {
        ...state, // note that we leave the user data so that we can display "sign in" or "sign up" on the login page
        authenticated: false,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
