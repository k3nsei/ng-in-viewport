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
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { InViewportConfig } from './in-viewport-config.class';
import { InViewportService } from './in-viewport.service';
import { InViewportUtils } from './in-viewport-utils';
import isObjectLiteral = InViewportUtils.isObjectLiteral;

export const InViewportMetadata = Symbol('InViewportMetadata');

@Directive({
  selector: '[inViewport], [in-viewport]'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  private config: InViewportConfig;
  private subscription: Subscription = new Subscription();

  @Output('inViewportAction') public action$: EventEmitter<any>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef,
    private inViewportService: InViewportService
  ) {
    this.config = new InViewportConfig();
    this.action$ = new EventEmitter();
  }

  @Input('inViewportOptions')
  set updateConfig(value: any) {
    if (isObjectLiteral(value)) {
      if (value.hasOwnProperty('rootElement')) {
        this.config.rootElement = value.rootElement;
      }
      if (value.hasOwnProperty('partial')) {
        this.config.partial = value.partial;
      }
      if (value.hasOwnProperty('direction')) {
        this.config.direction = value.direction;
      }
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.subscription.add(
        this.inViewportService.trigger$.subscribe((entry: IntersectionObserverEntry) => this.check(entry))
      );
      this.inViewportService.addTarget(this.elementRef.nativeElement, this.config.rootElement);
    } else {
      this.check(undefined, true);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (isPlatformBrowser(this.platformId)) {
      this.inViewportService.removeTarget(this.elementRef.nativeElement, this.config.rootElement);
    }
  }

  check(entry: IntersectionObserverEntry, force?: boolean) {
    if (force || (entry && entry.target === this.elementRef.nativeElement)) {
      const value = force || (this.config.partial ? entry.intersectionRatio > 0 : entry.intersectionRatio === 1);
      this.action$.emit({
        [InViewportMetadata]: { entry },
        target: this.elementRef.nativeElement,
        value
      });
    }
  }
}
