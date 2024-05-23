import { DestroyRef, Directive, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { InViewportDirective } from 'ng-in-viewport';

@Directive({
  standalone: true,
  selector: '[ngiExPageEnter],[ngi-exp-page-enter]',
  hostDirectives: [InViewportDirective],
})
export class PageEnterDirective {
  protected readonly destroyRef = inject(DestroyRef);

  protected readonly inViewport = inject(InViewportDirective, { self: true });

  protected readonly pageChange = output<void>();

  constructor() {
    this.inViewport.options = { threshold: 0 };

    this.inViewport.inViewportAction
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ visible }) => visible && this.pageChange.emit());
  }
}
