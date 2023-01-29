import { isBoolean } from 'lodash-es';

export class Partial {
  readonly #value: boolean;

  public get value(): boolean {
    return this.#value;
  }

  constructor(value: boolean | null | undefined) {
    this.#value = isBoolean(value) ? value : true;
  }
}
