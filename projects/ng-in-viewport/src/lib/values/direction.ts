import { InViewportDirection } from '../enums';

export class Direction {
  readonly #value: `${InViewportDirection}`;

  public get value(): `${InViewportDirection}` {
    return this.#value;
  }

  constructor(value: `${InViewportDirection}` = InViewportDirection.VERTICAL) {
    if (!Object.values<string>(InViewportDirection).includes(value)) {
      throw new TypeError('Invalid direction');
    }

    this.#value = value;
  }
}
