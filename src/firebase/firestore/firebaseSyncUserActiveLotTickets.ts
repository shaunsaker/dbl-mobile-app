import firestore from '@react-native-firebase/firestore';
import { LotId } from '../../store/lots/models';
import { createSyncQueryChannel } from './utils/createSyncQueryChannel';

// istanbul ignore next
export const firebaseSyncUserActiveLotTickets = async (
  lotId: LotId,
  userId: string,
) => {
  return createSyncQueryChannel(
    firestore()
      .collection('lots')
      .doc(lotId)
      .collection('tickets')
      .where('uid', '==', userId),
  );
};
