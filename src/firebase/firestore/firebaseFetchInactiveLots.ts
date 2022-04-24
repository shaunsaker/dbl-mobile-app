import firestore from '@react-native-firebase/firestore';
import { Lot } from '../../store/lots/models';

export const firebaseFetchInactiveLots = async ({
  startAfter,
  limit,
}: {
  startAfter: string;
  limit: number;
}): Promise<Lot[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const lots = (
        await firestore()
          .collection('lots')
          .where('active', '==', false)
          .orderBy('drawTime', 'desc')
          .startAfter(startAfter)
          .limit(limit)
          .get()
      ).docs.map(document => ({ id: document.id, ...document.data() } as Lot));

      resolve(lots);
    } catch (error) {
      reject(error);
    }
  });
};
