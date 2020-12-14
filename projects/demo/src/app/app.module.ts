/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InViewportModule } from 'ng-in-viewport';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';

@NgModule({
  imports: [BrowserModule.withServerTransition({ appId: 'invp-app' }), InViewportModule],
  declarations: [AppComponent, ExampleComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
