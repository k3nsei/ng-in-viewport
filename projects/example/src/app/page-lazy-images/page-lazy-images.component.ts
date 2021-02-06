/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'invp-ex-page-lazy-images',
  templateUrl: './page-lazy-images.component.html',
  styleUrls: ['./page-lazy-images.component.scss']
})
export class PageLazyImagesComponent implements OnInit {
  private static IMAGES_COUNT: number = 100;

  public imageDimensions: [number, number] = [640, 360];
  public gridTiles: Array<string> = [];

  public ngOnInit(): void {
    this.gridTiles = Array(PageLazyImagesComponent.IMAGES_COUNT)
      .fill(1)
      .map((v, k) => this.getImageUrl(v + k));
  }

  public getImageUrl(num: number = 1): string {
    const [width, height]: [number, number] = this.imageDimensions;
    const gravity: string = 'center';
    return `https://picsum.photos/${width}/${height}?random&gravity=${gravity}&${num}`;
  }
}
