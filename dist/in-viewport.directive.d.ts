import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from "@angular/core";
import { InViewportService } from "./in-viewport.service";
export declare class InViewportDirective implements AfterViewInit, OnDestroy {
    elementRef: ElementRef;
    private inViewportService;
    private config;
    action$: EventEmitter<any>;
    constructor(elementRef: ElementRef, inViewportService: InViewportService);
    updateConfig: any;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    check(entries: IntersectionObserverEntry[]): void;
}
