import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { InViewportService } from "./in-viewport.service";

export interface InViewportConfig {
  partial?: boolean;
  direction?: 'both' | 'vertical' | 'horizontal';
}

const DEFAULT_CONFIG: InViewportConfig = {
  partial: true,
  direction: 'both'
};

@Directive({
  selector: '[in-viewport]'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  private subscription: any;
  private config: InViewportConfig;
  private invp: boolean;

  @Output('inViewport') public action$: EventEmitter<any>;

  constructor(private elementRef: ElementRef,
              private inViewportService: InViewportService) {
    this.config = Object.assign({}, DEFAULT_CONFIG);
    this.action$ = new EventEmitter();
    this.invp = false;
  }

  @Input('inViewportOptions')
  set updateConfig(value: InViewportConfig) {
    this.config = Object.assign(this.config, value);
  }

  ngAfterViewInit() {
    this.inViewportService.addTarget(this.elementRef.nativeElement);
    this.subscription = this.inViewportService.trigger$
      .subscribe((entries: Array<any>) => this.check());

    setTimeout(() => this.check(true), 0);
  }

  ngOnDestroy() {
    this.inViewportService.removeTarget(this.elementRef.nativeElement);
    this.subscription.unsubscribe();
  }

  check(force?: boolean) {
    const el = this.elementRef.nativeElement;

    const elSize = (el.offsetWidth * el.offsetHeight);

    const rec = el.getBoundingClientRect();

    const vp = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const tViz = rec.top >= 0 && rec.top < vp.height;
    const bViz = rec.bottom > 0 && rec.bottom <= vp.height;

    const lViz = rec.left >= 0 && rec.left < vp.width;
    const rViz = rec.right > 0 && rec.right <= vp.width;

    const vVisible = this.config.partial ? tViz || bViz : tViz && bViz;
    const hVisible = this.config.partial ? lViz || rViz : lViz && rViz;

    let invp = false;

    switch (this.config.direction) {
      case 'vertical':
        invp = !!(elSize && vVisible);
        break;
      case 'horizontal':
        invp = !!(elSize && hVisible);
        break;
      default:
        invp = !!(elSize && vVisible && hVisible);
    }

    if (force || this.invp !== invp) {
      this.invp = invp;
      this.onChange();
    }
  }

  onChange() {
    this.action$.emit({
      target: this.elementRef.nativeElement,
      value: this.invp
    });
  }
}
