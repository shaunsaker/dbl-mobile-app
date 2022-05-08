import firestore from '@react-native-firebase/firestore';
import { Invoice } from '../../store/invoices/models';
import { LotId } from '../../store/lots/models';
import { UserId } from '../../store/userProfile/models';

export const firebaseFetchInvoices = async ({
  lotId,
  uid,
}: {
  lotId: LotId;
  uid: UserId;
}): Promise<Invoice[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const invoices = (
        await firestore()
          .collection('lots')
          .doc(lotId)
          .collection('invoices')
          .where('uid', '==', uid)
          .get()
      ).docs.map(
        document => ({ id: document.id, ...document.data() } as Invoice),
      );

      resolve(invoices);
    } catch (error) {
      reject(error);
    }
  });
};
