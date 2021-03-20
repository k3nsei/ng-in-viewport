/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { domRectFactory } from './dom-rect-mock';

export const intersectionObserverFactory = (
  trigger$: Subject<[Element, Partial<Omit<IntersectionObserverEntry, 'target'>>]>
): (() => void) => {
  const destroy$: Subject<void> = new Subject();

  class IntersectionObserverMock implements IntersectionObserver {
    public readonly root: Element | Document | null;

    public readonly rootMargin: string;

    public readonly thresholds: ReadonlyArray<number>;

    private readonly targets: Set<Element> = new Set();

    public constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      const { root = null, rootMargin = '0px 0px 0px 0px', threshold = [0] } = options || {};

      this.root = root;
      this.rootMargin = rootMargin;
      this.thresholds = Array.isArray(threshold) && threshold.length ? (threshold as number[]) : [threshold as number];

      trigger$
        .asObservable()
        .pipe(takeUntil(destroy$))
        .subscribe(([target, entry]: [Element, Partial<Omit<IntersectionObserverEntry, 'target'>>]) =>
          callback([this.createEntry(target, entry)], this)
        );
    }

    public observe(target: Element): void {
      this.targets.add(target);
    }

    public unobserve(target: Element): void {
      this.targets.delete(target);
    }

    public disconnect(): void {
      this.targets.clear();
    }

    public takeRecords(): IntersectionObserverEntry[] {
      return Array.from(this.targets).map((target: Element): IntersectionObserverEntry => this.createEntry(target, {}));
    }

    private createEntry(
      target: Element,
      entry: Partial<Omit<IntersectionObserverEntry, 'target'>> = {}
    ): IntersectionObserverEntry {
      return {
        target,
        intersectionRatio: 0,
        isIntersecting: false,
        rootBounds: this.root && domRectFactory(),
        boundingClientRect: domRectFactory(),
        intersectionRect: domRectFactory(),
        time: Date.now(),
        ...entry
      };
    }
  }

  window.IntersectionObserver = IntersectionObserverMock;

  return (): void => {
    destroy$.next();
    destroy$.complete();
  };
};
