import { ActionType, getType } from 'typesafe-actions';
import { fetchUserProfile, createUser } from './actions';
import { UserProfileState } from './models';

const reducerActions = {
  fetchUserProfileSuccess: fetchUserProfile.success,
  createUserSuccess: createUser.success,
};

export const initialState: UserProfileState = {
  data: undefined,
};

export const userProfileReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): UserProfileState => {
  switch (action.type) {
    case getType(fetchUserProfile.success):
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
      };

    case getType(createUser.success):
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    default: {
      return state;
    }
  }
};
