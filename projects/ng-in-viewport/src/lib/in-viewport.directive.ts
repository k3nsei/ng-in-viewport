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
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { InViewportConfig, InViewportConfigOptions } from './in-viewport-config';
import { InViewportService } from './in-viewport.service';

export const InViewportMetadata = Symbol('InViewportMetadata');

@Directive({
  selector: '[inViewport]'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  private config: InViewportConfig = new InViewportConfig();
  private readonly subscription: Subscription = new Subscription();

  @Input('inViewportOptions')
  private set options(value: InViewportConfigOptions) {
    this.config = new InViewportConfig(value);
  }

  @Output('inViewportAction') public readonly action$: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef,
    private inViewport: InViewportService
  ) {}

  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inViewport.register(this.elementRef.nativeElement, this.config);
      this.subscription.add(
        this.inViewport.trigger$
          .pipe(filter((entry: IntersectionObserverEntry) => entry && entry.target === this.elementRef.nativeElement))
          .subscribe((entry: IntersectionObserverEntry) => {
            const event = this.config.checkFn
              ? this.config.checkFn(entry, { force: false, config: this.config })
              : this.check(entry, false);
            this.action$.emit(event);
          })
      );
    } else {
      const event = this.config.checkFn
        ? this.config.checkFn(undefined, { force: true, config: this.config })
        : this.check(undefined, true);
      this.action$.emit(event);
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (isPlatformBrowser(this.platformId)) {
      this.inViewport.unregister(this.elementRef.nativeElement, this.config);
    }
  }

  private check(entry: IntersectionObserverEntry, force: boolean) {
    const visible = force || (this.config.partial ? entry.intersectionRatio > 0 : entry.intersectionRatio === 1);
    return {
      [InViewportMetadata]: { entry },
      target: this.elementRef.nativeElement,
      visible
    };
  }
}
