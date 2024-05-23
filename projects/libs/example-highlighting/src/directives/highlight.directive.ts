import { Directive, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { InViewportDirective } from 'ng-in-viewport';
import { map } from 'rxjs/operators';

@Directive({
  standalone: true,
  selector: '[ngiExHighlight]',
  host: {
    '[class.active]': 'visible()',
    '[class.inactive]': '!visible()',
  },
  hostDirectives: [InViewportDirective],
})
export class HighlightDirective {
  protected readonly inViewport = inject(InViewportDirective, { self: true });

  protected readonly visible = toSignal(this.inViewport.inViewportAction.pipe(map(({ visible }) => visible)), {
    initialValue: false,
  });
}
