/*******************************************************************************
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 * (https://www.linkedin.com/in/piotrstepniewski/)
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://opensource.org/licenses/MIT
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InViewportModule } from 'ng-in-viewport';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvpExampleComponent } from './invp-example/invp-example.component';

@NgModule({
  imports: [BrowserModule.withServerTransition({ appId: 'invp-app' }), InViewportModule, AppRoutingModule],
  declarations: [AppComponent, InvpExampleComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
