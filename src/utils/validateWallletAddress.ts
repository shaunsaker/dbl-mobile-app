import { validate } from 'bitcoin-address-validation';

export const validateWalletAddress = (address: string): boolean => {
  return validate(address);
};
