import { FactoryProvider, ModuleWithProviders, NgModule, OpaqueToken } from "@angular/core";
import { InViewportEventsService } from "./in-viewport-events.service";
import { InViewportIntersectionService } from "./in-viewport-intersection.service";
import { InViewportDirective } from "./in-viewport.directive";
import { InViewportService } from "./in-viewport.service";

export enum InViewportStrategies {
  Events,
  Intersection
}

export const InViewportStrategy = new OpaqueToken('InViewportStrategy');

const strategy: InViewportStrategies = (window && 'IntersectionObserver' in window)
  ? InViewportStrategies.Intersection
  : InViewportStrategies.Events;

const InViewportServiceFactory: FactoryProvider = {
  provide: InViewportService,
  useFactory: () => {
    switch (strategy) {
      case InViewportStrategies.Intersection:
        return new InViewportIntersectionService();
      default:
        return new InViewportEventsService();
    }
  }
};

@NgModule({
  imports: [],
  declarations: [
    InViewportDirective
  ],
  exports: [
    InViewportDirective
  ]
})
export class InViewportModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InViewportModule,
      providers: [
        {
          provide: InViewportStrategy,
          useValue: strategy
        },
        InViewportServiceFactory,
        InViewportEventsService,
        InViewportIntersectionService
      ]
    };
  }

  constructor(private inViewportService: InViewportService) {}
}
