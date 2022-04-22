import firestore from '@react-native-firebase/firestore';
import { Lot } from '../../store/lots/models';

export const firebaseFetchLatestInactiveLot = async (): Promise<Lot> => {
  return new Promise(async (resolve, reject) => {
    try {
      const lots = (
        await firestore()
          .collection('lots')
          .where('active', '==', false)
          .orderBy('dateCreated', 'desc')
          .limit(1)
          .get()
      ).docs.map(document => ({ id: document.id, ...document.data() } as Lot));

      const lot = lots[0];

      resolve(lot);
    } catch (error) {
      reject(error);
    }
  });
};
