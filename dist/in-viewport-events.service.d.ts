import { EventEmitter } from "@angular/core";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/debounceTime";
import { InViewportService } from "./in-viewport.service";
export declare class InViewportEventsService extends InViewportService {
    private scrollListener;
    private resizeListener;
    private domListener;
    private roots;
    trigger$: EventEmitter<any>;
    constructor();
    onChanges(): void;
    addTarget(target: HTMLElement, rootElement?: HTMLElement | Window): void;
    removeTarget(target: HTMLElement, rootElement?: HTMLElement | Window): void;
    getRoot(rootElement: any): Window | HTMLElement;
    findRoot(root: HTMLElement | Window): any;
}
