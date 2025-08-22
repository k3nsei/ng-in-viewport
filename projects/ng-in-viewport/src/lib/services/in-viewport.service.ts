import { Injectable, NgZone, inject } from '@angular/core';
import { Subject } from 'rxjs';

import { ObserverCache } from '../utils';
import { Config } from '../values';

@Injectable({ providedIn: 'root' })
export class InViewportService {
  readonly #trigger$ = new Subject<IntersectionObserverEntry>();

  #cache?: ObserverCache;

  public readonly trigger$ = this.#trigger$.asObservable();

  private readonly zone = inject(NgZone);

  public register(node: Element, config: Config): void {
    this.zone.runOutsideAngular(() => {
      this.#getCache().addNode(node, config);
    });
  }

  public unregister(node: Element, config: Config): void {
    this.zone.runOutsideAngular(() => {
      this.#getCache().deleteNode(node, config);
    });
  }

  #getCache(): ObserverCache {
    if (!this.#cache) {
      this.#cache = this.zone.runOutsideAngular(() => new ObserverCache((entries) => this.#onIntersectionEvent(entries)));
    }
    return this.#cache;
  }

  #onIntersectionEvent(entries: IntersectionObserverEntry[] = []): void {
    this.zone.run(() => entries.forEach((entry) => this.#trigger$.next(entry)));
  }
}
