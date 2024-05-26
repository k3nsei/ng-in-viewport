import { type ConfigInput, type ConfigValue } from '../types';

import { rootMarginAttribute } from './root-margin-attribute';
import { thresholdAttribute } from './threshold-attribute';

export const configAttribute = (input: ConfigInput): ConfigValue => {
  return {
    root: input.root ?? null,
    rootMargin: rootMarginAttribute(input?.rootMargin ?? '0px 0px 0px 0px'),
    threshold: thresholdAttribute(input?.threshold ?? [0]),
  };
};
