// FIXME: no need to parseFloat, can just use regex here
export const validateNumber = (text: string): boolean => {
  const number = parseFloat(text);

  return Boolean(number || number === 0);
};
