import { combineReducers } from 'redux';
import { AuthState } from './auth/models';
import { authReducer } from './auth/reducer';
import { LotsState } from './lots/models';
import { lotsReducer } from './lots/reducer';
import { TicketsState } from './tickets/models';
import { ticketsReducer } from './tickets/reducer';
import { UserProfileState } from './userProfile/models';
import { userProfileReducer } from './userProfile/reducer';

export interface ApplicationState {
  auth: AuthState;
  lots: LotsState;
  tickets: TicketsState;
  userProfile: UserProfileState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
  lots: lotsReducer,
  tickets: ticketsReducer,
  userProfile: userProfileReducer,
});

// @ts-expect-error FIXME:
export const initialState = rootReducer(undefined, { type: '' });

export default rootReducer;
