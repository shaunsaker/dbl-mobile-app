import { validateNumber } from './validateNumber';

describe('validateNumber', () => {
  it('validates an integer', () => {
    expect(validateNumber('5')).toEqual(true);
  });

  it('validates a float', () => {
    expect(validateNumber('9.99')).toEqual(true);
  });

  it('validates a float using a comma', () => {
    expect(validateNumber('9,99')).toEqual(true);
  });

  it('invalidates a string', () => {
    expect(validateNumber('abcdef')).toEqual(false);
  });

  it('invalidates an empty string', () => {
    expect(validateNumber('')).toEqual(false);
  });
});
