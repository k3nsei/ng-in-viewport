import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Renderer2 } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { InViewportAction, InViewportDirective } from 'ng-in-viewport';

@Component({
  standalone: true,
  selector: 'invp-ex-page-highlighting',
  templateUrl: './page-highlighting.component.html',
  styleUrls: ['./page-highlighting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, MatGridListModule, InViewportDirective],
})
export class PageHighlightingComponent {
  public items: { value: number }[] = Array.from({ length: 100 }, (_, i) => ({ value: i + 1 }));

  constructor(private readonly renderer: Renderer2) {}

  public highlight(event: InViewportAction) {
    const { target, visible } = event;

    const newClassname = visible ? 'active' : 'inactive';
    this.renderer.addClass(target, newClassname);

    const oldClassname = visible ? 'inactive' : 'active';
    this.renderer.removeClass(target, oldClassname);
  }

  protected itemTrackBy(index: number, item: { value: number }): number {
    return item.value;
  }
}

export default PageHighlightingComponent;
