import firestore from '@react-native-firebase/firestore';
import { LotId } from '../../store/lots/models';
import { Ticket } from '../../store/tickets/models';

export const firebaseFetchTickets = async ({
  lotId,
  userId,
}: {
  lotId: LotId;
  userId: string;
}): Promise<Ticket[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const tickets = (
        await firestore()
          .collection('lots')
          .doc(lotId)
          .collection('tickets')
          .where('uid', '==', userId)
          .get()
      ).docs.map(
        document => ({ id: document.id, ...document.data() } as Ticket),
      );

      resolve(tickets);
    } catch (error) {
      reject(error);
    }
  });
};
