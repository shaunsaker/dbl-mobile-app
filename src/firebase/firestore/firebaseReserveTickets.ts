import functions from '@react-native-firebase/functions';
import { InvoiceId } from '../../store/invoices/models';
import { ReserveTicketsRequestPayload } from '../../store/lots/actions';
import {
  FirebaseCallableFunctions,
  FirebaseCallableFunctionsResponse,
} from '../functions/models';

export const firebaseReserveTickets = async (
  payload: ReserveTicketsRequestPayload,
): Promise<FirebaseCallableFunctionsResponse<InvoiceId>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await functions().httpsCallable(
        FirebaseCallableFunctions.bookie,
      )(payload);

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
