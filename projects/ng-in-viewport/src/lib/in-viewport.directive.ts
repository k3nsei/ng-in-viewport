/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
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

import { InViewportConfig } from './in-viewport-config';
import { InViewportService } from './in-viewport.service';
import { InViewportConfigOptions } from './types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InViewportMetadata = Symbol('InViewportMetadata');

@Directive({
  selector: '[inViewport]'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  @Input('inViewportOptions')
  public set options(value: Partial<InViewportConfigOptions>) {
    this.config = InViewportConfig.fromOptions(value);
  }

  @Output() public readonly inViewportAction: EventEmitter<any> = new EventEmitter<any>();

  private config: InViewportConfig = InViewportConfig.fromOptions({});

  private readonly destroyed$: Subject<void> = new Subject();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object, // eslint-disable-line
    private readonly elementRef: ElementRef,
    private readonly inViewport: InViewportService
  ) {}

  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inViewport.register(this.elementRef.nativeElement, this.config);
      this.inViewport.trigger$
        .pipe(
          filter(
            (entry: IntersectionObserverEntry): boolean => entry && entry.target === this.elementRef.nativeElement
          ),
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

  private check(
    entry: IntersectionObserverEntry | undefined,
    force: boolean
  ): { [InViewportMetadata]: { entry?: IntersectionObserverEntry }; target: Element; visible: boolean } {
    const visible: boolean = force || !entry || this.isVisible(entry);

    return {
      [InViewportMetadata]: { entry },
      target: this.elementRef.nativeElement,
      visible
    };
  }

  private isVisible(entry: IntersectionObserverEntry): boolean {
    const partiallyVisible = entry.isIntersecting || entry.intersectionRatio > 0;
    const completelyVisible = entry.intersectionRatio >= 1;

    return this.config.partial ? partiallyVisible : completelyVisible;
  }

  private emitAction(entry: IntersectionObserverEntry | undefined, force: boolean): void {
    const event = this.config.checkFn
      ? this.config.checkFn(entry, { force, config: this.config })
      : this.check(entry, force);

    this.inViewportAction.emit(event);
  }
}
