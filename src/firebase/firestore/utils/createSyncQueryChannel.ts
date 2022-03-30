import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { eventChannel } from 'redux-saga';

// FIXME: we could extend createSyncCollectionChannel's types
// istanbul ignore next
const syncQuery = <T>(
  ref: FirebaseFirestoreTypes.Query,
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
export const createSyncQueryChannel = <T>(
  ref: FirebaseFirestoreTypes.Query,
) => {
  return eventChannel(emit => {
    syncQuery<T>(ref, emit);
    // The subscriber must return an unsubscribe function
    return () => {};
  });
};
