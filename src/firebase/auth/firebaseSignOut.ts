import auth from '@react-native-firebase/auth';

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
