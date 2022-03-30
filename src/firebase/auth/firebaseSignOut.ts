import auth from '@react-native-firebase/auth';

// istanbul ignore next
export const firebaseSignOut = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await auth().signOut();

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
