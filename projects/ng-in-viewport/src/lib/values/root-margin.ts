import { InvalidRootMarginException } from '../exceptions';

export class RootMargin {
  readonly #value: Values;

  public get value(): string {
    return this.#value;
  }

  constructor(value: string | null | undefined) {
    this.#value = RootMargin.parse(value);
  }

  private static parse(value: unknown): Values {
    const strValue = typeof value === 'string' ? value.trim() : '0px';
    const values = strValue.split(/\s+/);

    if (values.length <= 4 && values.every((val) => /^-?\d*\.?\d+(px|%)$/.test(val))) {
      const [top, right = top!, bottom = top!, left = right!] = values as Value[];

      return `${top} ${right} ${bottom} ${left}`;
    }

    throw new InvalidRootMarginException();
  }
}

type Unit = 'px' | '%';

type Positive = `${number}` | `${number}.${number}`;

type Negative = `-${Positive}`;

type Value = `${Positive | Negative}${Unit}`;

type Values = `${Value}` | `${Value} ${Value}` | `${Value} ${Value} ${Value}` | `${Value} ${Value} ${Value} ${Value}`;
