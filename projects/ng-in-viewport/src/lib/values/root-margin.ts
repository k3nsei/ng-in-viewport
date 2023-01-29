import { isString } from 'lodash-es';

import { InvalidRootMarginException } from '../exceptions';

type Unit = 'px' | '%';

type Positive = `${number}` | `${number}.${number}`;

type Negative = `-${Positive}`;

type Value = `${Positive | Negative}${Unit}`;

type Values = `${Value}` | `${Value} ${Value}` | `${Value} ${Value} ${Value}` | `${Value} ${Value} ${Value} ${Value}`;

export class RootMargin {
  readonly #value: Values;

  public get value(): string {
    return this.#value;
  }

  constructor(value: string | undefined) {
    this.#value = RootMargin.parse(value);
  }

  private static parse(value: unknown): Values {
    const strValue = isString(value) ? value.trim() : '0px';
    const values = strValue.split(/\s+/);

    if (values.length <= 4 && values.every((val) => /^-?\d*\.?\d+(px|%)$/.test(val))) {
      const [top, right = top, bottom = top, left = right] = values as Value[];

      return `${top} ${right} ${bottom} ${left}`;
    }

    throw new InvalidRootMarginException();
  }
}
