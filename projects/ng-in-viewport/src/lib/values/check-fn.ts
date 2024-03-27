import { generateRandomUID } from '../utils/generate-random-uid';

import { Config } from './config';

export interface InViewportCheckFnOptions {
  /**
   *  Whether action was triggered programmatically.
   */
  force: boolean;
  /**
   *  When an action is triggered programmatically, this property will hold a simulated visibility state.
   */
  forcedValue?: boolean;
  /**
   *  Instance of a configuration object.
   */
  config: Config;
}

export interface InViewportCheckFn<T = any> {
  (entry: IntersectionObserverEntry | undefined, options: InViewportCheckFnOptions): T;
}

const ids = new WeakMap<InViewportCheckFn<unknown>, string>();
const fallbackId = 'in-viewport-empty-check-fn';

export class CheckFn<T = any> {
  readonly #value: InViewportCheckFn<T> | undefined;

  readonly #id: string;

  public get value(): InViewportCheckFn<T> | undefined {
    return this.#value;
  }

  public get id(): string {
    return this.#id;
  }

  constructor(value: InViewportCheckFn<T> | null | undefined) {
    this.#value = typeof value === 'function' ? value : undefined;

    let id = ids.get(value!) ?? fallbackId;

    if (value !== null && value !== undefined && !ids.has(value)) {
      ids.set(value, (id = generateRandomUID('in-viewport-check-fn-')));
    }

    this.#id = id;
  }
}
