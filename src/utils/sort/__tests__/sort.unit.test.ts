import { sort } from '..';

describe('Util Sort', () => {
  it('should sort array', () => {
    const array = [1, 9, 2, 8, 3, 7, 4, 6, 5];
    sort(array);
    expect(array).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should do nothing if array is empty', () => {
    const array: number[] = [];
    sort(array);
    expect(array).toStrictEqual([]);
  });
});
