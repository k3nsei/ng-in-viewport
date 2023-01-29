import { InViewportDirection } from '../enums';
import { stringify, toBase64 } from '../utils';

import { CheckFn, InViewportCheckFn } from './check-fn';
import { Direction } from './direction';
import { Partial } from './partial';
import { RootMargin } from './root-margin';
import { RootNode } from './root-node';
import { Threshold } from './threshold';

export const checkFnId = Symbol('InViewportCheckFnId');
export const configHash = Symbol('InViewportConfigHash');

export class Config {
  readonly #value: {
    root: RootNode;
    rootMargin: RootMargin;
    threshold: Threshold;
    partial: Partial;
    direction: Direction;
    checkFn: CheckFn;
  };

  readonly #hash: string;

  public get root(): Element | null {
    return this.#value.root.value;
  }

  public get rootMargin(): string {
    return this.#value.rootMargin.value;
  }

  public get threshold(): readonly number[] {
    return this.#value.threshold.value;
  }

  public get partial(): boolean {
    return this.#value.partial.value;
  }

  public get direction(): `${InViewportDirection}` {
    return this.#value.direction.value;
  }

  public get checkFn(): InViewportCheckFn | undefined {
    return this.#value.checkFn.value;
  }

  public get [checkFnId](): string {
    return this.#value.checkFn.id;
  }

  public get [configHash](): string {
    return this.#hash;
  }

  constructor(
    options?:
      | (IntersectionObserverInit & {
          partial?: boolean;
          direction?: `${InViewportDirection}`;
          checkFn?: InViewportCheckFn;
        })
      | null
      | undefined
  ) {
    options ??= {};

    this.#value = Object.freeze({
      root: new RootNode(options.root),
      rootMargin: new RootMargin(options.rootMargin),
      threshold: new Threshold(options.threshold),
      partial: new Partial(options.partial),
      direction: new Direction(options.direction),
      checkFn: new CheckFn(options.checkFn),
    });

    this.#hash = toBase64(
      stringify({
        rootMargin: this.rootMargin,
        threshold: this.threshold,
        partial: this.partial,
        direction: this.direction,
        checkFn: this[checkFnId],
      })
    );
  }
}
