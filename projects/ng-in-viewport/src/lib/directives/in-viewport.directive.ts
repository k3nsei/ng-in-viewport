import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  input,
  output,
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
  public readonly options = input<InViewportOptions>({}, { alias: 'inViewportOptions' });

  public readonly inViewportAction = output<InViewportAction>();

  public readonly inViewportCustomCheck = output<unknown>();

  protected readonly config = computed(() => new Config(this.options()));

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
      this.#emit(undefined, true, true);
      return;
    }

    this.inViewportService.trigger$
      .pipe(
        filter((entry) => entry.target === this.nativeElement),
        takeUntil(this.destroyable.destroyed$)
      )
      .subscribe((entry) => {
        this.#emit(entry, false);
        this.changeDetectorRef.markForCheck();
      });

    this.inViewportService.register(this.nativeElement, this.config());
  }

  public ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inViewportService.unregister(this.nativeElement, this.config());

      this.#emit(undefined, true, false);
    }
  }

  #isVisible(entry: IntersectionObserverEntry): boolean {
    return this.config().partial ? entry.isIntersecting || entry.intersectionRatio > 0 : entry.intersectionRatio >= 1;
  }

  #emit(entry: IntersectionObserverEntry, force: false): void;
  #emit(entry: undefined, force: true, forcedValue: boolean): void;
  #emit(entry: IntersectionObserverEntry | undefined, force: boolean, forcedValue?: boolean): void {
    const visible = force ? Boolean(forcedValue) : entry ? this.#isVisible(entry) : true;

    this.inViewportAction.emit({
      [InViewportMetadata]: { entry },
      target: this.nativeElement,
      visible,
    });

    const checkFn = this.config().checkFn;
    if (checkFn) {
      const result = checkFn(entry, {
        force,
        forcedValue: force ? Boolean(forcedValue) : undefined,
        config: this.config(),
      });
      this.inViewportCustomCheck.emit(result);
    }
  }
}
