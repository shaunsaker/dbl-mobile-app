import messaging from '@react-native-firebase/messaging';
import { FirebaseMessagingTopic } from './models';

export const firebaseSubscribeToMessagingTopic = (
  topic: FirebaseMessagingTopic,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await messaging().subscribeToTopic(topic);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
