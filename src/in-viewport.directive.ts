import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { InViewportConfig } from "./in-viewport-config.class";
import { InViewportService } from "./in-viewport.service";

@Directive({
  selector: '[in-viewport], [inViewport]'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  private config: InViewportConfig;

  @Output('inViewportAction')
  public action$: EventEmitter<any>;

  constructor(public elementRef: ElementRef,
              private inViewportService: InViewportService) {
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
        this.config.rootElement = value.direction;
      }
    }
  }

  ngAfterViewInit() {
    this.inViewportService.trigger$.subscribe((entries: IntersectionObserverEntry[]) => this.check(entries));
    this.inViewportService.addTarget(this.elementRef.nativeElement, this.config.rootElement);
  }

  ngOnDestroy() {
    this.inViewportService.removeTarget(this.elementRef.nativeElement);
  }

  check(entries: IntersectionObserverEntry[]) {
    const entry = entries.find((item) => item.target === this.elementRef.nativeElement);
    if (entry) {
      const value = this.config.partial ? (entry.intersectionRatio > 0) : (entry.intersectionRatio === 1);

      this.action$.emit({
        target: entry.target,
        value
      })
    }
  }
}
