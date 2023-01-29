import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

import { ObserverCache } from '../utils';
import { Config } from '../values';

@Injectable({ providedIn: 'root' })
export class InViewportService {
  readonly #trigger$ = new Subject<IntersectionObserverEntry>();

  #cache!: ObserverCache;

  public readonly trigger$ = this.#trigger$.asObservable();

  constructor(private readonly zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.#cache = new ObserverCache((entries) => {
        if (Array.isArray(entries) && entries.length) {
          entries.forEach((entry) => this.#trigger$.next(entry));
        }
      });
    });
  }

  public register(node: Element, config: Config): void {
    this.zone.runOutsideAngular(() => {
      this.#cache.addNode(node, config);
    });
  }

  public unregister(node: Element, config: Config): void {
    this.zone.runOutsideAngular(() => {
      this.#cache.deleteNode(node, config);
    });
  }
}
