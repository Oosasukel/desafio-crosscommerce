export const sort = (array: number[]) => {
  quickSort(array, 0, array.length - 1);
};

const quickSort = (array: number[], startIndex: number, endIndex: number) => {
  if (array.length === 0 || startIndex === endIndex) return;

  const partitionIndex = partition(array, startIndex, endIndex);

  if (partitionIndex < endIndex) {
    quickSort(array, partitionIndex, endIndex);
  }
  if (partitionIndex > startIndex + 1) {
    quickSort(array, startIndex, partitionIndex - 1);
  }
};

const partition = (array: number[], startIndex: number, endIndex: number) => {
  const pivot = array[Math.floor((startIndex + endIndex) / 2)];
  let i = startIndex;
  let j = endIndex;

  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }
    while (array[j] > pivot) {
      j--;
    }

    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }

  return i;
};

const swap = (array: number[], i: number, j: number) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};
