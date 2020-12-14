/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import type { InViewportConfig } from '../in-viewport-config';

export interface InViewportConfigCheckFnOptions {
  force: boolean;
  config: InViewportConfig;
}

export type InViewportConfigCheckFn = (
  entry: IntersectionObserverEntry | undefined,
  options: InViewportConfigCheckFnOptions
) => any;
