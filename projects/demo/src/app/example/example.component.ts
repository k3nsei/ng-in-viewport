import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

import { InViewportAction, InViewportOptions } from 'ng-in-viewport';

@Component({
  selector: 'invp-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  public elements: number[] = Array(100)
    .fill(null)
    .map((_, idx: number) => idx + 1);

  private readonly activeClassName: string = 'item--active';

  @ViewChild('secondSection', { static: true })
  private readonly secondSection!: ElementRef<Element>;

  constructor(private readonly renderer: Renderer2) {}

  public handleAction({ target, visible }: InViewportAction): void {
    if (visible) {
      this.renderer.addClass(target, this.activeClassName);
    } else {
      this.renderer.removeClass(target, this.activeClassName);
    }
  }

  protected getOptions(section: 'first' | 'second', isEven: boolean): InViewportOptions {
    const isSecond = section === 'second';

    return {
      root: isSecond ? this.secondSection.nativeElement : undefined,
      threshold: isEven ? [0, 0.5, 1] : [0, 1],
      partial: !isSecond,
    };
  }
}
