import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { eventChannel } from 'redux-saga';

const syncDocument = <T>(
  ref: FirebaseFirestoreTypes.DocumentReference,
  cb: (data: T | { [key: string]: any }) => void,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const unsubscribe = ref.onSnapshot(
        (snapshot: FirebaseFirestoreTypes.DocumentSnapshot) => {
          const data = { id: snapshot.id, ...snapshot.data() };

          cb(data);
        },
        (error: Error) => {
          cb(error);
        },
      );

      resolve(unsubscribe);
    } catch (error) {
      reject(error);
    }
  });
};

export const createSyncDocumentChannel = <T>(
  ref: FirebaseFirestoreTypes.DocumentReference,
) => {
  return eventChannel(emit => {
    syncDocument<T>(ref, emit);

    // The subscriber must return an unsubscribe function
    return () => {};
  });
};
