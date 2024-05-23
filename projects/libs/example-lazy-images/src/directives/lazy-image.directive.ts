import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DestroyRef, Directive, effect, inject, input, PLATFORM_ID, signal, untracked } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { MatSnackBar } from '@angular/material/snack-bar';

import { InViewportDirective } from 'ng-in-viewport';
import { delay, of } from 'rxjs';
import { catchError, filter, map, take } from 'rxjs/operators';

@Directive({
  standalone: true,
  selector: '[ngiExLazyImage]',
  host: {
    '[attr.src]': 'src()',
    '[attr.data-loading]': 'loading()',
    '[attr.data-loaded]': 'loaded()',
  },
  hostDirectives: [InViewportDirective],
  exportAs: 'lazyImage',
})
export class LazyImageDirective {
  public readonly url = input.required<string>({ alias: 'ngiExLazyImage' });

  private readonly destroyRef = inject(DestroyRef);

  private readonly platformId = inject(PLATFORM_ID);

  private readonly httpClient = inject(HttpClient);

  private readonly snackBar = inject(MatSnackBar);

  private readonly inViewport = inject(InViewportDirective, { self: true });

  public readonly src = signal<string | null>(null);

  public readonly loading = signal(false);

  public readonly loaded = signal(false);

  protected readonly visible = toSignal(
    this.inViewport.inViewportAction.pipe(
      map(({ visible }) => visible),
      filter((visible) => visible),
      take(1),
    ),
    { initialValue: false },
  );

  constructor() {
    this.inViewport.options = { threshold: 0.001 };

    effect(() => {
      const url = this.url();
      const visible = this.visible();

      if (isPlatformServer(this.platformId) || !url?.trim() || !visible) {
        return;
      }

      untracked(() => this.fetch(url));
    });
  }

  private fetch(url: string): void {
    this.loading.set(true);

    this.httpClient
      .get(url, { responseType: 'blob' })
      .pipe(
        map((data: Blob) => URL.createObjectURL(data)),
        delay(500),
        catchError(() => {
          this.snackBar.open(`Error during fetching image from: ${url}`, undefined, {
            duration: 3000,
            panelClass: 'error-snackbar',
          });

          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.src.set(value);
        this.loading.set(false);
        this.loaded.set(value != null);
      });
  }
}
