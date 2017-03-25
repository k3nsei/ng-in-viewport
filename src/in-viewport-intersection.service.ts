import { EventEmitter, Injectable } from "@angular/core";
import { InViewportService } from "./in-viewport.service";

@Injectable()
export class InViewportIntersectionService extends InViewportService {
  private observer: any;

  public trigger$: EventEmitter<any>;

  constructor() {
    super();

    this.trigger$ = new EventEmitter();

    this.observer = new IntersectionObserver(
      (entries: Array<any>, observer: any) => this.onChanges(entries),
      {
        threshold: generateThresholdHelper()
      }
    );
  }

  onChanges(entries: Array<any>) {
    const result = entries.map((entry) => ({
      root: window,
      target: entry.target
    }));

    this.trigger$.emit(result);
  }

  addTarget(target: HTMLElement, rootElement?: HTMLElement | Window) {
    this.observer.observe(target);
  }

  removeTarget(target: HTMLElement, rootElement?: HTMLElement | Window) {
    this.observer.unobserve(target);
  }
}

function generateThresholdHelper() {
  const threshold: Array<number> = [];
  for (let i = 0; i <= 100; i++) {
    threshold.push(i / 100);
  }
  return threshold;
}
