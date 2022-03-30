import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type User = FirebaseAuthTypes.User;

export interface AuthState {
  loading: boolean;
  authenticated: boolean;
  user: User | undefined;
}
