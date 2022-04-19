import messaging from '@react-native-firebase/messaging';

export const firebaseGetMessagingToken = (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await messaging().getToken();

      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};
