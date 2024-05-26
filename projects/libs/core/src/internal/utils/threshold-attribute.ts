import { isNumber } from '@ngx-intersection/utils';

import { type ThresholdInput } from '../types';

export const thresholdAttribute = (value: ThresholdInput): number[] => {
  const hasArrayValues: boolean = Array.isArray(value);

  const values: number[] = hasArrayValues ? (value as number[]) : [];

  if (!hasArrayValues) {
    values.push(isNumber(value) ? value : parseFloat(value as string));
  }

  const result: number[] = values.filter((value) => isNumber(value) && value >= 0 && value <= 1);

  return result.length > 0 ? result : [0];
};
