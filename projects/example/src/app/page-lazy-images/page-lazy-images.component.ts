import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LazyImageSkeletonComponent } from './lazy-image-skeleton';
import { LazyImageDirective } from './lazy-image.directive';

@Component({
  standalone: true,
  selector: 'invp-ex-page-lazy-images',
  templateUrl: './page-lazy-images.component.html',
  styleUrls: ['./page-lazy-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, NgIf, MatGridListModule, MatSnackBarModule, LazyImageSkeletonComponent, LazyImageDirective],
})
export class PageLazyImagesComponent {
  public dimensions: [number, number] = [640, 360];

  public items: Array<string> = Array.from({ length: 100 }, (_, i) => this.getImageUrl(i + 1));

  protected itemTrackBy(index: number, item: string): string {
    return item;
  }

  private getImageUrl(number = 1): string {
    const [width, height]: [number, number] = this.dimensions;
    const searchParams = new URLSearchParams({
      random: '',
      gravity: 'center',
      number: `${number}`,
    });

    return `https://picsum.photos/${width}/${height}?${searchParams}`;
  }
}

export default PageLazyImagesComponent;
