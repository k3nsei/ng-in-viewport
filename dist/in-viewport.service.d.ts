import { EventEmitter } from "@angular/core";
export interface InViewportServiceRegistryObject {
    target: Element;
    rootElement: Element;
    observer: IntersectionObserver;
}
export declare class InViewportService {
    protected registry: InViewportServiceRegistryObject[];
    trigger$: EventEmitter<IntersectionObserverEntry>;
    constructor();
    protected onChanges(entries: IntersectionObserverEntry[]): void;
    protected findTarget(target: Element): InViewportServiceRegistryObject;
    addTarget(target: Element, rootElement?: Element): void;
    removeTarget(target: Element): void;
}
