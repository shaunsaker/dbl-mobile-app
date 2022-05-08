import firestore from '@react-native-firebase/firestore';
import { LotId } from '../../store/lots/models';
import { UserId } from '../../store/userProfile/models';
import { createSyncQueryChannel } from './utils/createSyncQueryChannel';

export const firebaseSyncLotInvoices = async ({
  lotId,
  uid,
}: {
  lotId: LotId;
  uid: UserId;
}) => {
  return createSyncQueryChannel(
    firestore()
      .collection('lots')
      .doc(lotId)
      .collection('invoices')
      .where('uid', '==', uid),
  );
};
