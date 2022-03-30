// FIXME: type this correctly
export const arrayToObject = (array: Record<string, any>[], idKey: string) => {
  const object: Record<string, any> = {};

  array.forEach(item => {
    object[item[idKey]] = item;
  });

  return object;
};
