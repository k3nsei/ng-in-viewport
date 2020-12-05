/*******************************************************************************
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 * (https://www.linkedin.com/in/piotrstepniewski/)
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://opensource.org/licenses/MIT
 */

import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  PLATFORM_ID
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { InViewportConfig, InViewportConfigOptions } from './in-viewport-config';
import { InViewportService } from './in-viewport.service';

export const InViewportMetadata = Symbol('InViewportMetadata');

@Directive({
  selector: '[inViewport]'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  private config: InViewportConfig = new InViewportConfig();
  private readonly destroyed$: Subject<void> = new Subject();

  @Input('inViewportOptions')
  public set options(value: InViewportConfigOptions) {
    this.config = new InViewportConfig(value);
  }

  @Output() public readonly inViewportAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object, // tslint:disable-line
    private readonly elementRef: ElementRef,
    private readonly inViewport: InViewportService
  ) {}

  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inViewport.register(this.elementRef.nativeElement, this.config);
      this.inViewport.trigger$
        .pipe(
          filter((entry: IntersectionObserverEntry): boolean => {
            return entry && entry.target === this.elementRef.nativeElement;
          }),
          takeUntil(this.destroyed$)
        )
        .subscribe((entry: IntersectionObserverEntry): void => {
          this.emitAction(entry, false);
        });
    } else {
      this.emitAction(undefined, true);
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();

    if (isPlatformBrowser(this.platformId)) {
      this.inViewport.unregister(this.elementRef.nativeElement, this.config);
    }
  }

  private check(entry: IntersectionObserverEntry, force: boolean) {
    const isVisible = () => {
      const partiallyVisible = entry.isIntersecting || entry.intersectionRatio > 0;
      const completelyVisible = entry.intersectionRatio >= 1;
      return this.config.partial ? partiallyVisible : completelyVisible;
    };
    const visible = force || !entry || isVisible();
    return { [InViewportMetadata]: { entry }, target: this.elementRef.nativeElement, visible };
  }

  private emitAction(entry: IntersectionObserverEntry, force: boolean): void {
    const event = this.config.checkFn
      ? this.config.checkFn(entry, { force, config: this.config })
      : this.check(entry, force);
    this.inViewportAction.emit(event);
  }
}
