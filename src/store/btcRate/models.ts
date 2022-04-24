export enum Currency {
  usd = 'USD',
}

export interface BtcRateState {
  data: { [Currency.usd]: number } | undefined;
  loading: boolean;
}
