import { ActionType, getType } from 'typesafe-actions';
import { fetchUserProfile, createUser, updateUserProfile } from './actions';
import { UserProfileState } from './models';

const reducerActions = {
  fetchUserProfileRequest: fetchUserProfile.request,
  fetchUserProfileSuccess: fetchUserProfile.success,
  fetchUserProfileFailure: fetchUserProfile.failure,
  createUserRequest: createUser.request,
  createUserSuccess: createUser.success,
  createUserFailure: createUser.failure,
  updateUserProfileRequest: updateUserProfile.request,
  updateUserProfileSuccess: updateUserProfile.success,
  updateUserProfileFailure: updateUserProfile.failure,
};

export const initialState: UserProfileState = {
  data: undefined,
  loading: false,
};

export const userProfileReducer = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
): UserProfileState => {
  switch (action.type) {
    case getType(fetchUserProfile.request):
    case getType(createUser.request):
    case getType(updateUserProfile.request):
      return {
        ...state,
        loading: true,
      };

    case getType(fetchUserProfile.success):
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        loading: false,
      };

    case getType(createUser.success):
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
        loading: false,
      };

    case getType(updateUserProfile.failure):
      return {
        ...state,
        loading: false,
      };

    case getType(fetchUserProfile.failure):
    case getType(createUser.failure):
    case getType(updateUserProfile.failure):
      return {
        ...state,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
