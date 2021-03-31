/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { Observable } from 'rxjs';

export interface InViewportRegistryEntry {
  root: Element | null;
  configHash: string;
  targets: Set<Element>;
  observer: IntersectionObserver;
}

export type InViewportRegistryEntries = InViewportRegistryEntry[];

export type InViewportTrigger = Observable<IntersectionObserverEntry>;
