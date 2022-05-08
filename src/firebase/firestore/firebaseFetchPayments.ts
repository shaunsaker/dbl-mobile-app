import firestore from '@react-native-firebase/firestore';
import { InvoiceId } from '../../store/invoices/models';
import { LotId } from '../../store/lots/models';
import { Payment } from '../../store/payments/models';
import { UserId } from '../../store/userProfile/models';

export const firebaseFetchPayments = async ({
  lotId,
  invoiceId,
  uid,
}: {
  lotId: LotId;
  invoiceId: InvoiceId;
  uid: UserId;
}): Promise<Payment[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payments = (
        await firestore()
          .collection('lots')
          .doc(lotId)
          .collection('invoices')
          .doc(invoiceId)
          .collection('payments')
          .where('uid', '==', uid)
          .get()
      ).docs.map(
        document => ({ id: document.id, ...document.data() } as Payment),
      );

      resolve(payments);
    } catch (error) {
      reject(error);
    }
  });
};
