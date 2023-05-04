import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { InViewportService } from '../services';
import { Config } from '../values';

import { DestroyableDirective } from './destroyable.directive';

export const InViewportMetadata = Symbol('InViewportMetadata');

export interface InViewportAction {
  [InViewportMetadata]: { entry?: IntersectionObserverEntry };
  target: HTMLElement | SVGElement | Element;
  visible: boolean;
}

export type InViewportOptions = Partial<ConstructorParameters<typeof Config>[0]>;

@Directive({
  standalone: true,
  selector: '[inViewport]',
  hostDirectives: [DestroyableDirective],
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  @Input('inViewportOptions')
  public set options(options: InViewportOptions) {
    this.config = new Config(options);
  }

  @Output() public readonly inViewportAction = new EventEmitter<InViewportAction>();

  @Output() public readonly inViewportCustomCheck = new EventEmitter<any>();

  private config = new Config({});

  protected readonly platformId = inject<string>(PLATFORM_ID);

  protected readonly changeDetectorRef = inject(ChangeDetectorRef);

  protected readonly elementRef = inject<ElementRef<Element>>(ElementRef);

  protected readonly destroyable = inject(DestroyableDirective, { self: true });

  protected readonly inViewportService = inject(InViewportService);

  private get nativeElement(): Element {
    return this.elementRef.nativeElement;
  }

  public ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.emit(undefined, true);
      return;
    }

    this.inViewportService.trigger$
      .pipe(
        filter((entry) => entry.target === this.nativeElement),
        takeUntil(this.destroyable.destroyed$)
      )
      .subscribe((entry) => {
        this.emit(entry, false);
        this.changeDetectorRef.markForCheck();
      });

    this.inViewportService.register(this.nativeElement, this.config);
  }

  public ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inViewportService.unregister(this.nativeElement, this.config);
    }
  }

  private isVisible(entry: IntersectionObserverEntry): boolean {
    return this.config.partial ? entry.isIntersecting || entry.intersectionRatio > 0 : entry.intersectionRatio >= 1;
  }

  private emit(entry: IntersectionObserverEntry, force: false): void;
  private emit(entry: undefined, force: true): void;
  private emit(entry: IntersectionObserverEntry | undefined, force: boolean): void {
    this.inViewportAction.emit({
      [InViewportMetadata]: { entry },
      target: this.nativeElement,
      visible: force || !entry || this.isVisible(entry),
    });

    if (this.config.checkFn) {
      this.inViewportCustomCheck.emit(this.config.checkFn(entry, { force, config: this.config }));
    }
  }
}
