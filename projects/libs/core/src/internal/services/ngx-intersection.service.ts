import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';

import { noop } from '@ngx-intersection/utils';

@Injectable({ providedIn: 'root' })
export class NgxIntersectionService {
  protected readonly platformId = inject(PLATFORM_ID);

  protected readonly zone = inject(NgZone);
  protected observer: IntersectionObserver | null = null;

  public observe(
    target: Element,
    callback: (entry: IntersectionObserverEntry) => void,
    options?: {
      root?: Element | Document | null;
      rootMargin?: string;
      threshold?: number | number[];
    },
  ): () => void {
    let unobserve: () => void = noop;

    this.zone.runOutsideAngular(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          if (Object.is(entry.target, target)) {
            callback(entry);
          }
        }
      }, options);

      observer.observe(target);

      unobserve = () => observer.unobserve(target);

      this.observer = observer;
    });

    return unobserve;
  }
}
