import { EventEmitter } from "@angular/core";
export interface InViewportServiceRegistryObject {
    targets: Element[];
    rootElement: Element;
    observer: IntersectionObserver;
}
export declare class InViewportService {
    protected registry: InViewportServiceRegistryObject[];
    trigger$: EventEmitter<IntersectionObserverEntry[]>;
    constructor();
    protected onChanges(entries: IntersectionObserverEntry[]): void;
    protected findRegistryEntry(rootElement: Element): InViewportServiceRegistryObject;
    addTarget(target: Element, rootElement?: Element): void;
    removeTarget(target: Element, rootElement?: Element): void;
    protected getRootElement(element: any): any;
}
