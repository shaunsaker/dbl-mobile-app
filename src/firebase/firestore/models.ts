export enum FirebaseCallableFunctions {
  reserveTickets = 'reserveTickets',
}

export interface FirebaseCallableFunctionsResponse<T> {
  error: boolean;
  message: string;
  data: T | undefined;
}
