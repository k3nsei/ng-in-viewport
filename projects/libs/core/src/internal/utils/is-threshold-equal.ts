export const isThresholdEqual = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  const aSorted = a.sort((x, y) => x - y);
  const bSorted = b.sort((x, y) => x - y);

  return aSorted.every((val, idx) => Object.is(val, bSorted[idx]));
};
