import { EventEmitter } from "@angular/core";
export declare abstract class InViewportService {
    trigger$: EventEmitter<any>;
    constructor();
    abstract onChanges(...args: Array<any>): void;
    abstract addTarget(target: HTMLElement, rootElement?: HTMLElement | Window): void;
    abstract removeTarget(target: HTMLElement, rootElement?: HTMLElement | Window): void;
}
