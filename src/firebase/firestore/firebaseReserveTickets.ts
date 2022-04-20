import functions from '@react-native-firebase/functions';
import { ReserveTicketsRequestPayload } from '../../store/lots/actions';
import { TicketId } from '../../store/tickets/models';
import {
  FirebaseCallableFunctions,
  FirebaseCallableFunctionsResponse,
} from './models';

// istanbul ignore next
export const firebaseReserveTickets = async (
  payload: ReserveTicketsRequestPayload,
): Promise<FirebaseCallableFunctionsResponse<TicketId[]>> => {
  const response = (await functions().httpsCallable(
    FirebaseCallableFunctions.bookie,
  )(payload)) as FirebaseCallableFunctionsResponse<TicketId[]>;

  return response;
};
