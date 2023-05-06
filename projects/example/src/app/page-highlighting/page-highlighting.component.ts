import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Renderer2, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { InViewportAction, InViewportDirective } from 'ng-in-viewport';

interface HighlightingItem {
  id: string;
  value: number;
}

@Component({
  standalone: true,
  selector: 'invp-ex-page-highlighting',
  templateUrl: './page-highlighting.component.html',
  styleUrls: ['./page-highlighting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, MatGridListModule, InViewportDirective],
})
export class PageHighlightingComponent {
  public readonly items: HighlightingItem[] = Array.from({ length: 100 }, (_, i) => ({
    id: crypto.randomUUID(),
    value: i + 1,
  }));

  private readonly renderer = inject(Renderer2);

  public highlight(event: InViewportAction): void {
    const { target, visible } = event;
    const classnames = ['active', 'inactive'];
    const [toAdd, toRemove] = visible ? classnames : classnames.reverse();

    this.renderer.addClass(target, toAdd);
    this.renderer.removeClass(target, toRemove);
  }

  public trackByItem(index: number, { id }: HighlightingItem): string {
    return id;
  }
}

export default PageHighlightingComponent;
