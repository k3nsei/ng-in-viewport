/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'highlighting',
    pathMatch: 'full',
    loadChildren: () =>
      import('../page-highlighting/page-highlighting.module').then((module) => module.PageHighlightingModule)
  },
  {
    path: 'infinite-scroll',
    pathMatch: 'full',
    loadChildren: () =>
      import('../page-infinite-scroll/page-infinite-scroll.module').then((module) => module.PageInfiniteScrollModule)
  },
  {
    path: 'lazy-images',
    pathMatch: 'full',
    loadChildren: () =>
      import('../page-lazy-images/page-lazy-images.module').then((module) => module.PageLazyImagesModule)
  },
  {
    path: '**',
    redirectTo: '/highlighting'
  }
];

const ROUTER_OPTIONS: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, ROUTER_OPTIONS)],
  exports: [RouterModule]
})
export class RoutingModule {}
