import { EventEmitter, Injectable } from "@angular/core";

export interface InViewportServiceRegistryObject {
  target: Element,
  rootElement: Element,
  observer: IntersectionObserver
}

@Injectable()
export class InViewportService {
  protected registry: InViewportServiceRegistryObject[];
  public trigger$: EventEmitter<IntersectionObserverEntry>;

  constructor() {
    this.registry = [];
    this.trigger$ = new EventEmitter();
  }

  protected onChanges(entries: IntersectionObserverEntry[]): void {
    this.trigger$.emit(entries[0]);
  }

  protected findTarget(target: Element) {
    return this.registry.find((item) => item.target === target);
  }

  public addTarget(target: Element, rootElement?: Element): void {
    if (!this.findTarget(target)) {
      // Create target observer options
      const observerOptions: any = {
        threshold: Array(101).fill(void 0).map((item, i) => (i / 100))
      };

      if (rootElement) {
        observerOptions.root = rootElement;
      }

      // Create target object
      const targetObj = {
        target,
        rootElement,
        observer: new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => this.onChanges(entries),
          observerOptions
        )
      };

      // Start to observe target
      targetObj.observer.observe(target);

      // Add target to registry
      this.registry.push(targetObj);
    }
  }

  public removeTarget(target: Element): void {
    const targetObj = this.findTarget(target);
    if (targetObj) {
      targetObj.observer.disconnect();
      this.registry.splice(this.registry.indexOf(targetObj), 1);
    }
  }
}
