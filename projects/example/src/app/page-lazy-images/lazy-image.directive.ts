import { HttpClient } from '@angular/common/http';
import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animationFrameScheduler, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

import { InViewportAction, InViewportDirective } from 'ng-in-viewport';

export const enum LazyImageClassname {
  Loading = 'loading',
  Loaded = 'loaded',
}

@Directive({
  standalone: true,
  selector: '[invpExLazyImage]',
  hostDirectives: [
    {
      directive: InViewportDirective,
      inputs: ['inViewportOptions: invpExLazyImageOptions'],
      outputs: ['inViewportAction: viewportAction'],
    },
  ],
  exportAs: 'invp-ex-lazy-image',
})
export class LazyImageDirective {
  public readonly src = input.required<string>({ alias: 'invpExLazyImage' });

  public readonly viewportAction = output<InViewportAction>();

  public readonly loading = signal(false);

  public readonly loaded = signal(false);

  private readonly destroyRef = inject(DestroyRef);

  private readonly elementRef = inject(ElementRef);

  private readonly renderer = inject(Renderer2);

  private readonly httpClient = inject(HttpClient);

  private readonly snackBar = inject(MatSnackBar);

  private readonly inViewport = inject(InViewportDirective, { self: true });

  constructor() {
    effect(() => {
      if (this.loading()) {
        this.renderer.addClass(this.elementRef.nativeElement, LazyImageClassname.Loading);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, LazyImageClassname.Loading);
      }
    });

    effect(() => {
      if (this.loaded()) {
        this.renderer.addClass(this.elementRef.nativeElement, LazyImageClassname.Loaded);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, LazyImageClassname.Loaded);
      }
    });
  }

  public handleViewportAction(action: InViewportAction): void {
    if (action.visible) {
      this.load();
    }
  }

  private load(): void {
    if (this.src() == null) {
      return;
    }

    this.loading.set(true);

    this.httpClient
      .get(this.src(), { responseType: 'blob' })
      .pipe(
        catchError((_error) => throwError(() => new Error(`Error during fetching image from: ${this.src}`))),
        tap((data: Blob) =>
          this.renderer.setAttribute(this.elementRef.nativeElement, 'src', URL.createObjectURL(data))
        ),
        delay(0, animationFrameScheduler),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.loaded.set(true);
        },
        error: (error) => {
          this.loading.set(false);
          this.snackBar.open(error, undefined, {
            duration: 3000,
            panelClass: 'error-snackbar',
          });
        },
        complete: () => this.loading.set(false),
      });
  }
}
