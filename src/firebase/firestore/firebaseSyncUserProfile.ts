import firestore from '@react-native-firebase/firestore';

import { createSyncDocumentChannel } from './utils/createSyncDocumentChannel';

// istanbul ignore next
export const firebaseSyncUserProfile = async (uid: string) => {
  return createSyncDocumentChannel(firestore().collection('users').doc(uid));
};
