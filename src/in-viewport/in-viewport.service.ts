import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface InViewportServiceRegistryObject {
  targets: Element[];
  rootElement: Element;
  observer: IntersectionObserver;
}

@Injectable()
export class InViewportService {
  protected registry: InViewportServiceRegistryObject[];
  public trigger$: BehaviorSubject<IntersectionObserverEntry>;

  constructor() {
    this.registry = [];
    this.trigger$ = new BehaviorSubject<IntersectionObserverEntry>(null);
  }

  protected onChanges(entries: IntersectionObserverEntry[]): void {
    if (Array.isArray(entries) && entries.length) {
      entries.forEach((entry) => this.trigger$.next(entry));
    }
  }

  protected findRegistryEntry(rootElement: Element) {
    return this.registry.find((item) => item.rootElement === this.getRootElement(rootElement));
  }

  public addTarget(target: Element, rootElement?: Element): void {
    let registryEntry = this.findRegistryEntry(rootElement);
    if (!registryEntry) {
      const registryEntryObserverOptions: any = {
        root: this.getRootElement(rootElement),
        threshold: Array(101)
          .fill(void 0)
          .map((item, i) => i / 100)
      };
      registryEntry = {
        targets: [target],
        rootElement: this.getRootElement(rootElement),
        observer: new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => this.onChanges(entries),
          registryEntryObserverOptions
        )
      };
      registryEntry.observer.observe(target);
      this.registry.push(registryEntry);
    } else if (registryEntry.targets.indexOf(target) < 0) {
      registryEntry.targets.push(target);
      registryEntry.observer.observe(target);
    }
  }

  public removeTarget(target: Element, rootElement?: Element): void {
    const registryEntry = this.findRegistryEntry(rootElement);
    const registryEntryIdx = this.registry.indexOf(registryEntry);
    if (registryEntry) {
      const targetIdx = registryEntry.targets.indexOf(target);
      if (targetIdx >= 0) {
        registryEntry.observer.unobserve(target);
        registryEntry.targets.splice(targetIdx, 1);
      }
      if (registryEntry.targets.length === 0) {
        registryEntry.observer.disconnect();
        this.registry.splice(registryEntryIdx, 1);
      }
    }
  }

  protected getRootElement(element: any) {
    return element && element.nodeType === 1 ? element : null;
  }
}
