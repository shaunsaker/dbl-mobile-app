import messaging from '@react-native-firebase/messaging';

export const firebaseRequestMessagingPermission = (): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      const authorisationStatus = await messaging().requestPermission();

      resolve(authorisationStatus);
    } catch (error) {
      reject(error);
    }
  });
};
