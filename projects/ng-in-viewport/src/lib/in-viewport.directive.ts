import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { InViewportConfig } from './in-viewport-config';
import { InViewportService } from './in-viewport.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[inViewport], [in-viewport]'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  private options: Object;
  private config: InViewportConfig;
  private subscription: Subscription;

  @Input('inViewportOptions')
  private set updateOptions(value: any) {
    this.options = value;
  }

  @Output('inViewportAction') public action$: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elementRef: ElementRef, private inViewport: InViewportService) {
    this.options = {};
  }

  ngAfterViewInit() {
    this.inViewport.register(this.elementRef.nativeElement, this.options['root']);
    this.subscription = this.inViewport.trigger$
      .pipe(filter((entry: IntersectionObserverEntry) => !!entry && entry.target === this.elementRef.nativeElement))
      .subscribe((entry: IntersectionObserverEntry) => this.action$.emit(entry));
  }

  ngOnDestroy() {
    this.inViewport.unregister(this.elementRef.nativeElement, this.options['root']);
    this.subscription.unsubscribe();
  }
}
