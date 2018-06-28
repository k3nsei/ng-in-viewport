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
