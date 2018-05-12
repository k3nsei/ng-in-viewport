import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { InViewportConfig } from './in-viewport-config.class';
import { InViewportService } from './in-viewport.service';

export const InViewportMetadata = Symbol('InViewportMetadata');

@Directive({
  selector: '[in-viewport], [inViewport]'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  private config: InViewportConfig;

  @Output('inViewportAction') public action$: EventEmitter<any>;

  constructor(public elementRef: ElementRef, private inViewportService: InViewportService) {
    this.config = new InViewportConfig();
    this.action$ = new EventEmitter();
  }

  @Input('inViewportOptions')
  set updateConfig(value: any) {
    if (value && Object.prototype.toString.call(value) === '[object Object]') {
      if (value.rootElement instanceof Element) {
        this.config.rootElement = value.rootElement;
      }
      if ('partial' in value) {
        this.config.partial = value.partial;
      }
      if ('direction' in value) {
        this.config.direction = value.direction;
      }
    }
  }

  ngAfterViewInit() {
    this.inViewportService.trigger$.subscribe((entry: IntersectionObserverEntry) => this.check(entry));
    this.inViewportService.addTarget(this.elementRef.nativeElement, this.config.rootElement);
  }

  ngOnDestroy() {
    this.inViewportService.removeTarget(this.elementRef.nativeElement, this.config.rootElement);
  }

  check(entry: IntersectionObserverEntry) {
    if (entry && entry.target === this.elementRef.nativeElement) {
      const value = this.config.partial ? entry.intersectionRatio > 0 : entry.intersectionRatio === 1;

      this.action$.emit({
        [InViewportMetadata]: { entry },
        target: entry.target,
        value
      });
    }
  }
}
