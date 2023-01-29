import { NgModule } from '@angular/core';

import { DestroyableDirective, InViewportDirective } from './directives/';

@NgModule({
  imports: [InViewportDirective, DestroyableDirective],
  exports: [InViewportDirective, DestroyableDirective],
})
export class InViewportModule {}
