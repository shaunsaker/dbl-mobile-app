import { arrayToObject } from './arrayToObject';

describe('arrayToObject', () => {
  it('converts an array to an object using id as key by default', () => {
    const array = [
      { id: '1', data: true },
      { id: '2', data: false },
    ];

    expect(arrayToObject(array, 'id')).toEqual({
      1: { id: '1', data: true },
      2: { id: '2', data: false },
    });
  });

  it('converts an array to an object using a passed id key', () => {
    const array = [
      { id: '1', data: true, uid: '11' },
      { id: '2', data: false, uid: '22' },
    ];

    expect(arrayToObject(array, 'uid')).toEqual({
      '11': { id: '1', data: true, uid: '11' },
      '22': { id: '2', data: false, uid: '22' },
    });
  });
});
