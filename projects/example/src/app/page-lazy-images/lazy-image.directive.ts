import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnInit, Renderer2, Self } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, delay, filter, take, takeUntil, tap } from 'rxjs/operators';

import { DestroyableDirective, InViewportDirective } from 'ng-in-viewport';

@Directive({
  standalone: true,
  selector: '[invpExLazyImage]',
  hostDirectives: [InViewportDirective],
  exportAs: 'invp-ex-lazy-image',
})
export class LazyImageDirective implements OnInit, AfterViewInit {
  private static LOADING_CLASS_NAME = 'loading';

  private static LOADED_CLASS_NAME = 'loaded';

  @Input('invpExLazyImage')
  public src!: string;

  public get loading(): boolean {
    return this.loading$.getValue();
  }

  public set loading(value: boolean) {
    this.loading$.next(value);
    this.changeDetectorRef.markForCheck();

    if (value) {
      this.renderer.addClass(this.elementRef.nativeElement, LazyImageDirective.LOADING_CLASS_NAME);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, LazyImageDirective.LOADING_CLASS_NAME);
    }
  }

  public get loaded(): boolean {
    return this.loaded$.getValue();
  }

  public set loaded(value: boolean) {
    this.loaded$.next(value);
    this.changeDetectorRef.markForCheck();

    if (value) {
      this.renderer.addClass(this.elementRef.nativeElement, LazyImageDirective.LOADED_CLASS_NAME);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, LazyImageDirective.LOADED_CLASS_NAME);
    }
  }

  private readonly loading$ = new BehaviorSubject<boolean>(false);

  private readonly loaded$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly elementRef: ElementRef,
    private readonly httpClient: HttpClient,
    private readonly renderer: Renderer2,
    private readonly snackBar: MatSnackBar,
    @Self() private readonly destroyable: DestroyableDirective,
    @Self() private readonly inViewport: InViewportDirective
  ) {}

  public ngOnInit(): void {
    this.inViewport.options = { threshold: 0.0001 };
  }

  public ngAfterViewInit(): void {
    this.inViewport.inViewportAction
      .pipe(
        filter(({ visible }) => visible),
        take(1),
        takeUntil(this.destroyable.destroyed$)
      )
      .subscribe(() => this.load());
  }

  public load(): void {
    this.loading = true;

    this.httpClient
      .get(this.src, { responseType: 'blob' })
      .pipe(
        catchError((_error) => throwError(() => new Error(`Error during fetching image from: ${this.src}`))),
        tap((data: Blob) =>
          this.renderer.setAttribute(this.elementRef.nativeElement, 'src', URL.createObjectURL(data))
        ),
        delay(10),
        takeUntil(this.destroyable.destroyed$)
      )
      .subscribe({
        next: () => {
          this.loading = false;
          this.loaded = true;
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open(error, undefined, {
            duration: 3000,
            panelClass: 'error-snackbar',
          });
        },
        complete: () => this.changeDetectorRef.detectChanges(),
      });
  }
}
