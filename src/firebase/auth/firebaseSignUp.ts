import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const firebaseSignup = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<FirebaseAuthTypes.User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = (
        await auth().createUserWithEmailAndPassword(email, password)
      ).user;

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
