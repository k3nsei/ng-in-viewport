/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { InViewportConfigCheckFn, InViewportConfigDirections, InViewportConfigOptions } from './types';
import {
  stringifyObject,
  toBase64,
  withCheckFn,
  withDirection,
  withPartial,
  withRoot,
  withRootMargin,
  withThreshold
} from './utils';

export class InViewportConfig {
  private readonly _root?: Element;

  private readonly _rootMargin: string;

  private readonly _threshold: number | number[];

  private readonly _partial: boolean;

  private readonly _direction: InViewportConfigDirections;

  private readonly _checkFn?: InViewportConfigCheckFn;

  private readonly _hash: string;

  private constructor(
    root: Element | undefined,
    rootMargin: string,
    threshold: number | number[],
    partial: boolean,
    direction: InViewportConfigDirections,
    checkFn?: InViewportConfigCheckFn
  ) {
    this._root = root;
    this._rootMargin = rootMargin;
    this._threshold = threshold;
    this._partial = partial;
    this._direction = direction;
    this._checkFn = checkFn;

    this._hash = toBase64(
      stringifyObject({
        rootMargin: this.rootMargin,
        threshold: this.threshold,
        partial: this.partial,
        direction: this.direction,
        checkFn: String(this.checkFn)
      })
    );
  }

  public static fromOptions(options: Partial<InViewportConfigOptions> = {}): InViewportConfig {
    return new InViewportConfig(
      withRoot(options.root),
      withRootMargin(options.rootMargin),
      withThreshold(options.threshold),
      withPartial(options.partial),
      withDirection(options.direction),
      withCheckFn(options.checkFn)
    );
  }

  public get root(): Element | undefined {
    return this._root;
  }

  public get rootMargin(): string {
    return this._rootMargin;
  }

  public get threshold(): number | number[] {
    return this._threshold;
  }

  public get partial(): boolean {
    return this._partial;
  }

  public get direction(): InViewportConfigDirections {
    return this._direction;
  }

  public get hash(): string {
    return this._hash;
  }

  public get checkFn(): InViewportConfigCheckFn | undefined {
    return this._checkFn;
  }
}
