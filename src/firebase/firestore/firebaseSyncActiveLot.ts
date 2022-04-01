import firestore from '@react-native-firebase/firestore';
import { createSyncQueryChannel } from './utils/createSyncQueryChannel';

// istanbul ignore next
export const firebaseSyncActiveLot = async () => {
  return createSyncQueryChannel(
    firestore().collection('lots').where('active', '==', true),
  );
};
