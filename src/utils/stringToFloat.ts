import { numberToDigits } from './numberToDigits';

export const stringToFloat = (text: string): number => {
  if (!text || text === '0' || text === '0.00') {
    return 0.0;
  }

  return numberToDigits(parseFloat(text));
};
