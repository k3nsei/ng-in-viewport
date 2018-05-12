import { ModuleWithProviders, NgModule } from '@angular/core';
import { InViewportDirective } from './in-viewport.directive';
import { InViewportService } from './in-viewport.service';

@NgModule({
  imports: [],
  declarations: [InViewportDirective],
  exports: [InViewportDirective]
})
export class InViewportModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InViewportModule,
      providers: [InViewportService]
    };
  }

  constructor(private inViewportService: InViewportService) {}
}
