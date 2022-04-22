import firestore from '@react-native-firebase/firestore';
import { createSyncQueryChannel } from './utils/createSyncQueryChannel';

export const firebaseSyncActiveLot = async () => {
  return createSyncQueryChannel(
    firestore().collection('lots').where('active', '==', true),
  );
};
