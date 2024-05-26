import { isString } from '@ngx-intersection/utils';

import { type RootMarginInput, type RootMarginUnitValue, type RootMarginValue } from '../types';

import { isRootMarginUnitValue } from './is-root-margin-unit-value';

export const rootMarginAttribute = (input: RootMarginInput): RootMarginValue => {
  const values: string[] = ((isString(input) && input.trim()) || '0px').split(/\s+/);

  const [top = '0px', right = top, bottom = top, left = right] =
    values.filter<RootMarginUnitValue>(isRootMarginUnitValue);

  return `${top} ${right} ${bottom} ${left}`;
};
