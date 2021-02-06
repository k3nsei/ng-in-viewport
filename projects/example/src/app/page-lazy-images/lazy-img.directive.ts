/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Optional, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InViewportDirective } from 'ng-in-viewport';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, delay, filter, take, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[invpExLazyImg]',
  exportAs: 'invpExLazyImg'
})
export class LazyImgDirective implements AfterViewInit, OnDestroy {
  private static LOADING_CLASS_NAME = 'loading';
  private static LOADED_CLASS_NAME = 'loaded';

  @Input('invpExLazyImg') src!: string;

  public get loading(): boolean {
    return this.loading$.getValue();
  }

  public set loading(value: boolean) {
    this.loading$.next(value);
    if (value) {
      this.renderer.addClass(this.elementRef.nativeElement, LazyImgDirective.LOADING_CLASS_NAME);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, LazyImgDirective.LOADING_CLASS_NAME);
    }
  }

  public get loaded(): boolean {
    return this.loaded$.getValue();
  }

  public set loaded(value: boolean) {
    this.loaded$.next(value);
    if (value) {
      this.renderer.addClass(this.elementRef.nativeElement, LazyImgDirective.LOADED_CLASS_NAME);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, LazyImgDirective.LOADED_CLASS_NAME);
    }
  }

  private readonly loading$ = new BehaviorSubject<boolean>(false);
  private readonly loaded$ = new BehaviorSubject<boolean>(false);
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly elementRef: ElementRef,
    private readonly http: HttpClient,
    private readonly renderer: Renderer2,
    private readonly snackBar: MatSnackBar,
    @Optional() private readonly inViewport: InViewportDirective
  ) {}

  public ngAfterViewInit(): void {
    if (this.inViewport) {
      this.inViewport.inViewportAction
        .pipe(
          filter(({ visible }) => visible),
          take(1),
          takeUntil(this.destroyed$)
        )
        .subscribe(() => this.load());
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public load(): void {
    this.loading = true;

    this.http
      .get(this.src, { responseType: 'blob' })
      .pipe(
        catchError((error) => throwError(`Error during getting image from: ${this.src}`)),
        tap((data: Blob) =>
          this.renderer.setAttribute(this.elementRef.nativeElement, 'src', URL.createObjectURL(data))
        ),
        delay(10),
        takeUntil(this.destroyed$)
      )
      .subscribe(
        () => {
          this.loading = false;
          this.loaded = true;
        },
        (error) => {
          this.loading = false;
          this.snackBar.open(error, undefined, {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
        }
      );
  }
}
