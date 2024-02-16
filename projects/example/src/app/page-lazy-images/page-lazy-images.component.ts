import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LazyImageSkeletonComponent } from './lazy-image-skeleton/lazy-image-skeleton.component';
import { LazyImageDirective } from './lazy-image.directive';

interface ImageItem {
  id: string;
  imageUrl: string;
}

@Component({
  standalone: true,
  selector: 'invp-ex-page-lazy-images',
  templateUrl: './page-lazy-images.component.html',
  styleUrl: './page-lazy-images.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatGridListModule, MatSnackBarModule, LazyImageSkeletonComponent, LazyImageDirective],
})
export class PageLazyImagesComponent {
  public readonly dimensions: [number, number] = [640, 360];

  public readonly items: ReadonlyArray<ImageItem> = Array.from(
    { length: 100 },
    (_, i): ImageItem => ({
      id: crypto.randomUUID(),
      imageUrl: this.getImageUrl(i + 1),
    })
  );

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
