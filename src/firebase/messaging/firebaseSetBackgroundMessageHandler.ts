import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

export const firebaseSetBackgroundMessageHandler = (
  cb: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
): void => {
  messaging().setBackgroundMessageHandler(cb);
};
