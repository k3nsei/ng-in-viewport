/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { Component, Renderer2 } from '@angular/core';
import { InViewportMetadata } from 'ng-in-viewport';

@Component({
  selector: 'invp-ex-page-highlighting',
  templateUrl: './page-highlighting.component.html',
  styleUrls: ['./page-highlighting.component.scss']
})
export class PageHighlightingComponent {
  private static ELEMENTS = 100;

  public gridTiles: Array<number> = Array(PageHighlightingComponent.ELEMENTS)
    .fill(1)
    .map((v, k) => v + k);

  constructor(private renderer: Renderer2) {}

  highlightTile(event: {
    [InViewportMetadata]: { entry: IntersectionObserverEntry };
    target: HTMLElement;
    visible: boolean;
  }) {
    const {
      [InViewportMetadata]: { entry },
      target,
      visible
    } = event;

    const addClass = visible ? 'active' : 'inactive';
    this.renderer.addClass(target, addClass);

    const rmClass = visible ? 'inactive' : 'active';
    this.renderer.removeClass(target, rmClass);
  }
}
