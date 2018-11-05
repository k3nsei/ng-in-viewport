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

  @Output() public readonly inViewportAction: EventEmitter<any> = new EventEmitter<any>();

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
          .subscribe((entry: IntersectionObserverEntry) => this.emitAction(entry, false))
      );
    } else {
      this.emitAction(undefined, true);
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
