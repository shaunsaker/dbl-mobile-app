import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// istanbul ignore next
export const firebaseSignIn = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<FirebaseAuthTypes.User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = (await auth().signInWithEmailAndPassword(email, password))
        .user;

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
