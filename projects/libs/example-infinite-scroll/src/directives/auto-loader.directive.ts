import { DestroyRef, Directive, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { InViewportDirective } from 'ng-in-viewport';

@Directive({
  standalone: true,
  selector: '[ngiExAutoLoader],[ngi-exp-auto-loader]',
  hostDirectives: [InViewportDirective],
})
export class AutoLoaderDirective {
  protected readonly load = output<void>();

  protected readonly destroyRef = inject(DestroyRef);

  protected readonly inViewport = inject(InViewportDirective, { self: true });

  constructor() {
    this.inViewport.options = { threshold: 0 };

    this.inViewport.inViewportAction
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ visible }) => visible && this.load.emit());
  }
}
