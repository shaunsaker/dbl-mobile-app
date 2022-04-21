export enum FirebaseCallableFunctions {
  bookie = 'bookie',
}

export interface FirebaseCallableFunctionsResponse<T> {
  error: boolean;
  message: string;
  data: T | undefined;
}
