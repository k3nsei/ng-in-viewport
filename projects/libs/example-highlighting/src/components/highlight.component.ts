import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';

import { InViewportModule } from 'ng-in-viewport';

import { HighlightDirective } from '../directives';

@Component({
  standalone: true,
  selector: 'ngi-ex-highlighting',
  templateUrl: './highlight.component.html',
  styleUrl: './highlight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatGridListModule, InViewportModule, HighlightDirective],
})
export class HighlightComponent {
  public readonly items = Array.from<unknown, GridListItem>({ length: 100 }, (_, i) => {
    return {
      id: globalThis.crypto.randomUUID(),
      value: i + 1,
    };
  });
}

type GridListItem = {
  id: string;
  value: number;
};
