/*******************************************************************************
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 * (https://www.linkedin.com/in/piotrstepniewski/)
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvpExampleComponent } from './invp-example/invp-example.component';

const routes: Routes = [
  {
    path: '',
    component: InvpExampleComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
