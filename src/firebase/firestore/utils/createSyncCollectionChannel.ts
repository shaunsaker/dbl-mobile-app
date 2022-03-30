import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { eventChannel } from 'redux-saga';

// istanbul ignore next
const syncCollection = <T>(
  ref: FirebaseFirestoreTypes.CollectionReference,
  cb: (data: T | { [key: string]: any }) => void,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const unsubscribe = ref.onSnapshot(
        (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
          const data = snapshot.docs.map(
            (document: FirebaseFirestoreTypes.DocumentData) => {
              return {
                ...document.data(),
                id: document.id,
              };
            },
          );

          cb(data);
        },
        error => {
          reject(error);
        },
      );

      resolve(unsubscribe);
    } catch (error) {
      reject(error);
    }
  });
};

// istanbul ignore next
export const createSyncCollectionChannel = <T>(
  ref: FirebaseFirestoreTypes.CollectionReference,
) => {
  return eventChannel(emit => {
    syncCollection<T>(ref, emit);
    // The subscriber must return an unsubscribe function
    return () => {};
  });
};
