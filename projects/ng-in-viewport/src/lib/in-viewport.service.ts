/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { InViewportConfig } from './in-viewport-config';
import type { InViewportRegistryEntries, InViewportRegistryEntry, InViewportTrigger } from './types';

@Injectable({ providedIn: 'root' })
export class InViewportService {
  public get trigger$(): InViewportTrigger {
    return this.triggerSubject.asObservable();
  }

  private readonly triggerSubject: Subject<IntersectionObserverEntry> = new Subject();

  private registry: InViewportRegistryEntries = [];

  constructor(private ngZone: NgZone) {}

  public register(target: Element, config: InViewportConfig): void {
    this.ngZone.runOutsideAngular(() => {
      const foundedEntry = this.findEntry(config.root, config.hash);
      if (foundedEntry && !foundedEntry.targets.has(target)) {
        foundedEntry.targets.add(target);
        foundedEntry.observer.observe(target);
      } else {
        const root: Element | null = this.getRootElement(config.root);
        const options: any = {
          root: root !== null ? root : undefined,
          rootMargin: config.rootMargin,
          threshold: config.threshold
        };
        const entry: InViewportRegistryEntry = {
          root,
          configHash: config.hash,
          targets: new Set([target]),
          observer: new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => this.ngZone.run(() => this.emitTrigger(entries)),
            options
          )
        };
        entry.observer.observe(target);
        this.registry = [...this.registry, entry];
      }
    });
  }

  public unregister(target: Element, config: InViewportConfig): void {
    this.ngZone.runOutsideAngular(() => {
      const foundedEntry = this.findEntry(config.root, config.hash);
      if (foundedEntry) {
        const { observer, targets } = foundedEntry;
        if (targets.has(target)) {
          observer.unobserve(target);
          targets.delete(target);
        }
        if (targets.size === 0) {
          observer.disconnect();
          this.registry = this.registry.filter((entry) => entry !== foundedEntry);
        }
      }
    });
  }

  private emitTrigger(entries: IntersectionObserverEntry[]): void {
    if (Array.isArray(entries) && entries.length) {
      entries.forEach((entry) => this.triggerSubject.next(entry));
    }
  }

  private getRootElement(element?: Element): Element | null {
    return element && element.nodeType === Node.ELEMENT_NODE ? element : null;
  }

  private findEntry(root: Element | undefined, configHash: string): InViewportRegistryEntry | undefined {
    return this.registry.find(
      (entry: InViewportRegistryEntry): boolean =>
        entry.root === this.getRootElement(root) && entry.configHash === configHash
    );
  }
}
