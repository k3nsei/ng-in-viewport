import { isString } from '@ngx-intersection/utils';

import { type RootMarginUnitValue } from '../types';

export const isRootMarginUnitValue = (value: unknown): value is RootMarginUnitValue => {
  return isString(value) && /^-?\d*\.?\d+(px|%)$/.test(value);
};
