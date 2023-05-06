import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Renderer2, inject } from '@angular/core';

import { InViewportAction, InViewportDirective } from 'ng-in-viewport';

import { SectionOptionsPipe } from './section-options.pipe';

interface Item {
  id: string;
  value: number;
}
@Component({
  standalone: true,
  selector: 'invp-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, InViewportDirective, SectionOptionsPipe],
})
export class ExampleComponent {
  public readonly items: Item[] = Array.from({ length: 100 }, (_, idx: number) => ({
    id: globalThis.crypto.randomUUID(),
    value: idx + 1,
  }));

  private readonly renderer = inject(Renderer2);

  public handleAction({ target, visible }: InViewportAction): void {
    const activeClassname = 'item--active';

    if (visible) {
      this.renderer.addClass(target, activeClassname);
    } else {
      this.renderer.removeClass(target, activeClassname);
    }
  }

  public trackByItem(index: number, { id }: Item): string {
    return id;
  }
}
