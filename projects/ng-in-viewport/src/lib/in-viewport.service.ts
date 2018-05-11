import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface InViewportRegistryEntry {
  root: Element;
  targets: Set<Element>;
  observer: IntersectionObserver;
}

export type InViewportTrigger = BehaviorSubject<IntersectionObserverEntry>;
export type InViewportRegistry = InViewportRegistryEntry[];

@Injectable({
  providedIn: 'root'
})
export class InViewportService {
  public readonly trigger$: InViewportTrigger = new BehaviorSubject<IntersectionObserverEntry>(null);
  private registry: InViewportRegistry = [];

  private emitTrigger(entries: IntersectionObserverEntry[]) {
    if (Array.isArray(entries) && entries.length) {
      entries.forEach((entry) => this.trigger$.next(entry));
    }
  }

  private getRootElement(element?: Element) {
    return element && element.nodeType === Node.ELEMENT_NODE ? element : null;
  }

  private findEntry(root: Element) {
    return this.registry.find((entry) => entry.root === this.getRootElement(root));
  }

  public register(target: Element, root?: Element): void {
    const foundedEntry = this.findEntry(root);
    if (foundedEntry && !foundedEntry.targets.has(target)) {
      foundedEntry.targets.add(target);
      foundedEntry.observer.observe(target);
    } else {
      const options: any = {
        root: this.getRootElement(root),
        threshold: Array(101)
          .fill(null)
          .map((__, i) => i / 100)
      };
      const entry: InViewportRegistryEntry = {
        root: this.getRootElement(root),
        targets: new Set([target]),
        observer: new IntersectionObserver((entries) => this.emitTrigger(entries), options)
      };
      entry.observer.observe(target);
      this.registry = [...this.registry, entry];
    }
  }

  public unregister(target: Element, root?: Element): void {
    const foundedEntry = this.findEntry(root);
    if (foundedEntry) {
      const { observer, targets } = foundedEntry;
      if (targets.has(target)) {
        observer.unobserve(target);
        targets.delete(target);
      }
      if (targets.size === 0) {
        observer.disconnect();
        this.registry = this.registry.filter((entry) => entry !== foundedEntry);
      }
    }
  }
}
