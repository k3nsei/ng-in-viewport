import { InvalidThresholdException } from '../exceptions';

export class Threshold {
  readonly #value: readonly number[];

  public get value(): readonly number[] {
    return this.#value;
  }

  constructor(value: number | number[] | null | undefined) {
    this.#value = Threshold.validate(value ?? [0, 1]);
  }

  private static validate(value: unknown): number[] {
    if (Threshold.isValid(value)) {
      return [value];
    }

    if (Array.isArray(value) && value.every((val) => Threshold.isValid(val))) {
      return value.sort();
    }

    throw new InvalidThresholdException();
  }

  private static isValid(value: unknown): value is number {
    return typeof value === 'number' && value >= 0 && value <= 1;
  }
}
