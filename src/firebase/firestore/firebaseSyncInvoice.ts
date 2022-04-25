import firestore from '@react-native-firebase/firestore';
import { InvoiceId } from '../../store/invoices/models';
import { LotId } from '../../store/lots/models';
import { createSyncDocumentChannel } from './utils/createSyncDocumentChannel';

export const firebaseSyncInvoice = async ({
  lotId,
  invoiceId,
}: {
  lotId: LotId;
  invoiceId: InvoiceId;
}) => {
  return createSyncDocumentChannel(
    firestore()
      .collection('lots')
      .doc(lotId)
      .collection('invoices')
      .doc(invoiceId),
  );
};
