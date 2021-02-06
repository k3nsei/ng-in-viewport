/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing';
import { SharedModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserModule, BrowserAnimationsModule, SharedModule, RoutingModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
