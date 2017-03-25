import { EventEmitter } from "@angular/core";
import { InViewportService } from "./in-viewport.service";
export declare class InViewportEventsService extends InViewportService {
    private scroll$;
    private scrollSubscription;
    private resize$;
    private resizeSubscription;
    private dom$;
    private domSubscription;
    private roots;
    trigger$: EventEmitter<any>;
    constructor();
    onChanges(): void;
    addTarget(target: HTMLElement, rootElement?: HTMLElement | Window): void;
    removeTarget(target: HTMLElement, rootElement?: HTMLElement | Window): void;
    getRoot(rootElement: any): Window | HTMLElement;
    findRoot(root: HTMLElement | Window): any;
}
