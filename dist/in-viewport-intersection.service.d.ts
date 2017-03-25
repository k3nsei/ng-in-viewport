import { EventEmitter } from "@angular/core";
import { InViewportService } from "./in-viewport.service";
export declare class InViewportIntersectionService extends InViewportService {
    private observer;
    trigger$: EventEmitter<any>;
    constructor();
    onChanges(entries: Array<any>): void;
    addTarget(target: HTMLElement, rootElement?: HTMLElement | Window): void;
    removeTarget(target: HTMLElement, rootElement?: HTMLElement | Window): void;
}
