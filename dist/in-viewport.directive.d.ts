import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from "@angular/core";
import { InViewportService } from "./in-viewport.service";
export interface InViewportConfig {
    partial?: boolean;
    direction?: 'both' | 'vertical' | 'horizontal';
}
export declare class InViewportDirective implements AfterViewInit, OnDestroy {
    private elementRef;
    private inViewportService;
    private subscription;
    private config;
    private invp;
    action$: EventEmitter<any>;
    constructor(elementRef: ElementRef, inViewportService: InViewportService);
    updateConfig: InViewportConfig;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    check(force?: boolean): void;
    onChange(): void;
}
