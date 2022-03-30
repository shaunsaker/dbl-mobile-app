import { createAsyncAction } from 'typesafe-actions';
import { Username } from '../userProfile/models';
import { User } from './models';

export const signUp = createAsyncAction(
  'AUTH/signUpRequest',
  'AUTH/signUpSuccess',
  'AUTH/signUpFailure',
)<
  { username: Username; email: string; password: string },
  { user: User; username: Username },
  Error
>();

export const signIn = createAsyncAction(
  'AUTH/signInRequest',
  'AUTH/signInSuccess',
  'AUTH/signInFailure',
)<{ email: string; password: string }, User, Error>();

export const resetPassword = createAsyncAction(
  'AUTH/resetPasswordRequest',
  'AUTH/resetPasswordSuccess',
  'AUTH/resetPasswordFailure',
)<{ email: string }, void, Error>();

export const signOut = createAsyncAction(
  'AUTH/signOutRequest',
  'AUTH/signOutSuccess',
  'AUTH/signOutFailure',
)<void, void, Error>();
