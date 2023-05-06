import { Pipe, PipeTransform } from '@angular/core';

import { InViewportOptions } from 'ng-in-viewport';

@Pipe({
  standalone: true,
  name: 'options',
  pure: true,
})
export class SectionOptionsPipe implements PipeTransform {
  public transform(element: HTMLElement, section: 'first' | 'second', isEven: boolean): InViewportOptions {
    const isSecond: boolean = section === 'second';

    return {
      root: isSecond ? element : undefined,
      threshold: isEven ? [0, 0.5, 1] : [0, 1],
      partial: !isSecond,
    };
  }
}
