import { ModuleWithProviders, OpaqueToken } from "@angular/core";
import { InViewportService } from "./in-viewport.service";
export declare enum InViewportStrategies {
    Events = 0,
    Intersection = 1,
}
export declare const InViewportStrategy: OpaqueToken;
export declare class InViewportModule {
    private inViewportService;
    static forRoot(): ModuleWithProviders;
    constructor(inViewportService: InViewportService);
}
