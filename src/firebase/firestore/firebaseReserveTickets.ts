import functions from '@react-native-firebase/functions';
import { ReserveTicketsRequestPayload } from '../../store/lots/actions';
import {
  FirebaseCallableFunctions,
  FirebaseCallableFunctionsResponse,
} from './models';

// istanbul ignore next
export const firebaseReserveTickets = async (
  payload: ReserveTicketsRequestPayload,
): Promise<FirebaseCallableFunctionsResponse<void>> => {
  const response = (await functions().httpsCallable(
    FirebaseCallableFunctions.reserveTickets,
  )(payload)) as FirebaseCallableFunctionsResponse<void>;

  return response;
};
