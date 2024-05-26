import { computed, Directive, effect, ElementRef, inject, input, output } from '@angular/core';

import { configAttribute, isThresholdEqual, NgxIntersectionService } from '../internal';

@Directive({
  standalone: true,
  selector: '[ngxIntersection]',
})
export class NgxIntersectionDirective {
  public readonly config = input(
    {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: [0],
    },
    {
      alias: 'ngxIntersection',
      transform: configAttribute,
    },
  );

  public readonly intersectionChange = output<IntersectionObserverEntry>();

  protected readonly intersectionService = inject(NgxIntersectionService);

  protected readonly elementRef = inject<ElementRef<Element>>(ElementRef, { self: true });

  protected readonly root = computed(() => this.config().root);

  protected readonly rootMargin = computed(() => this.config().rootMargin);

  protected readonly threshold = computed(() => this.config().threshold, { equal: isThresholdEqual });

  constructor() {
    effect((onCleanup) => {
      const options = {
        root: this.root(),
        rootMargin: this.rootMargin(),
        threshold: this.threshold(),
      };

      const unobserve = this.intersectionService.observe(
        this.elementRef.nativeElement,
        (entry) => this.intersectionChange.emit(entry),
        options,
      );

      onCleanup(() => unobserve());
    });
  }
}
