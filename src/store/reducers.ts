import { combineReducers } from 'redux';
import { AuthState } from './auth/models';
import { authReducer } from './auth/reducer';
import { UserProfileState } from './userProfile/models';
import { userProfileReducer } from './userProfile/reducer';

export interface ApplicationState {
  auth: AuthState;
  userProfile: UserProfileState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
});

// @ts-expect-error FIXME:
export const initialState = rootReducer(undefined, { type: '' });

export default rootReducer;
