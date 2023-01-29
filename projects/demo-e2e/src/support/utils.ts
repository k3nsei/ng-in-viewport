export const inRange = (number: number, start: number, end?: number): boolean => {
  if (end == null) {
    end = start;
    start = 0;
  }
  return number >= start && number <= end;
};
