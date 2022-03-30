export const numberToDigits = (value: number, digits: number = 2): number =>
  parseFloat(value.toFixed(digits));
