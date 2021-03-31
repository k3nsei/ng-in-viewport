/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { InViewportConfigCheckFn } from './in-viewport-config-check-fn';
import { InViewportConfigDirections } from './in-viewport-config-directions';

export interface InViewportConfigOptions {
  root: Element;
  rootMargin: string;
  threshold: number | number[];
  partial: boolean;
  direction: InViewportConfigDirections;
  checkFn: InViewportConfigCheckFn;
}
