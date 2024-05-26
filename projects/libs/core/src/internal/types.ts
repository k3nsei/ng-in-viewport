export type ConfigInput = {
  root?: Element | Document | null;
  rootMargin?: `${RootMarginUnitValue}${` ${RootMarginUnitValue}` | ''}${` ${RootMarginUnitValue}` | ''}${` ${RootMarginUnitValue}` | ''}`;
  threshold?: ThresholdStrValue | number | number[];
};

export type ConfigValue = {
  root: Element | Document | null;
  rootMargin: RootMarginValue;
  threshold: number[];
};

export type RootMarginInput = ConfigInput['rootMargin'];

export type RootMarginValue =
  `${RootMarginUnitValue} ${RootMarginUnitValue} ${RootMarginUnitValue} ${RootMarginUnitValue}`;

export type RootMarginUnitValue = `${number}${'px' | '%'}`;

export type ThresholdInput = ConfigInput['threshold'];

export type ThresholdStrValue = `${1 | 0}` | `1.0` | `0.${number}`;
