/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageLazyImagesComponent } from './page-lazy-images.component';

const routes: Routes = [
  {
    path: '',
    component: PageLazyImagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageLazyImagesRoutingModule {}
