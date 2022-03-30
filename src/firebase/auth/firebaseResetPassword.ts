import auth from '@react-native-firebase/auth';

// istanbul ignore next
export const firebaseResetPassword = ({
  email,
}: {
  email: string;
}): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await auth().sendPasswordResetEmail(email);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
