/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { PageHighlightingRoutingModule } from './page-highlighting-routing.module';
import { PageHighlightingComponent } from './page-highlighting.component';

@NgModule({
  imports: [CommonModule, SharedModule, PageHighlightingRoutingModule],
  declarations: [PageHighlightingComponent],
  exports: [PageHighlightingComponent],
  entryComponents: [PageHighlightingComponent]
})
export class PageHighlightingModule {}
