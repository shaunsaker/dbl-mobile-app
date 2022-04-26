import { validate } from 'bitcoin-address-validation';

// TODO: SS remove this
export const validateWalletAddress = (address: string): boolean => {
  return validate(address);
};
