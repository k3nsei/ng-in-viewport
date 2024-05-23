import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { InViewportModule } from 'ng-in-viewport';

import { LazyImageDirective } from '../directives';

import { SkeletonComponent } from './skeleton';

interface ImageItem {
  id: string;
  imageUrl: string;
}

@Component({
  standalone: true,
  selector: 'ngi-ex-lazy-images',
  templateUrl: './lazy-images.component.html',
  styleUrl: './lazy-images.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatGridListModule, MatSnackBarModule, InViewportModule, LazyImageDirective, SkeletonComponent],
})
export class LazyImagesComponent {
  public readonly dimensions: [number, number] = [640, 360];

  public readonly items: ReadonlyArray<ImageItem> = Array.from(
    { length: 100 },
    (_, i): ImageItem => ({
      id: crypto.randomUUID(),
      imageUrl: this.getImageUrl(i + 1),
    }),
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
