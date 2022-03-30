import { stringToFloat } from './stringToFloat';

describe('stringToFloat', () => {
  it('converts an integer string to currency', () => {
    expect(stringToFloat('5')).toEqual(5.0);
  });

  it('converts a float string to currency', () => {
    expect(stringToFloat('5.99')).toEqual(5.99);
  });

  it('converts a 0 string to currency', () => {
    expect(stringToFloat('0')).toEqual(0.0);
  });

  it('converts an empty to currency', () => {
    expect(stringToFloat('')).toEqual(0.0);
  });
});
