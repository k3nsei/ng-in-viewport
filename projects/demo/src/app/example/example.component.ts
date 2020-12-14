/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { ChangeDetectionStrategy, Component, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'invp-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ExampleComponent {
  public elements: number[] = Array(100)
    .fill(null)
    .map((_, idx: number) => idx + 1);

  readonly #activeClassName: string = 'item--active';

  constructor(private readonly renderer: Renderer2) {}

  handleAction({ target = null, visible = false }: { target: HTMLElement | null; visible: boolean }): void {
    if (visible) {
      this.renderer.addClass(target, this.#activeClassName);
    } else {
      this.renderer.removeClass(target, this.#activeClassName);
    }
  }
}
