import { ModuleWithProviders } from "@angular/core";
import { InViewportService } from "./in-viewport.service";
export declare class InViewportModule {
    private inViewportService;
    static forRoot(): ModuleWithProviders;
    constructor(inViewportService: InViewportService);
}
