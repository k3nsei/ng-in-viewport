/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { LazyImgSkeletonComponent } from './lazy-img-skeleton';
import { LazyImgDirective } from './lazy-img.directive';
import { PageLazyImagesRoutingModule } from './page-lazy-images-routing.module';
import { PageLazyImagesComponent } from './page-lazy-images.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, SharedModule, PageLazyImagesRoutingModule],
  declarations: [PageLazyImagesComponent, LazyImgDirective, LazyImgSkeletonComponent],
  exports: [PageLazyImagesComponent],
  entryComponents: [PageLazyImagesComponent]
})
export class PageLazyImagesModule {}
