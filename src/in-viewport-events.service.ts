import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { fromEvent } from "rxjs/observable/fromEvent";
import { debounceTime } from "rxjs/operator/debounceTime";
import { Subscription } from "rxjs/Subscription";
import { InViewportService } from "./in-viewport.service";

@Injectable()
export class InViewportEventsService extends InViewportService {
  private scroll$: Observable<any>;
  private scrollSubscription: Subscription;
  private resize$: Observable<any>;
  private resizeSubscription: Subscription;
  private dom$: any;
  private domSubscription: any;
  private roots: Array<any>;

  public trigger$: EventEmitter<any>;

  constructor() {
    super();

    this.trigger$ = new EventEmitter();

    this.roots = [];

    this.scroll$ = fromEvent(window, 'scroll', { passive: true });
    this.scrollSubscription = debounceTime.call(this.scroll$, 50)
      .subscribe((event: Event) => this.onChanges());

    this.resize$ = fromEvent(window, 'resize', { passive: true });
    this.resizeSubscription = debounceTime.call(this.resize$, 50)
      .subscribe((event: Event) => this.onChanges());

    if (window && 'MutationObserver' in window) {
      this.dom$ = new MutationObserver((mutations) => this.onChanges());
      // this.domSubscription = this.dom$.observe(document, {
      //   attributes: true,
      //   childList: true,
      //   characterData: true,
      //   subtree: true
      // });
    }
  }

  onChanges() {
    const rootObj = this.findRoot(window);
    const result = rootObj
      ? rootObj.targets.map((target: HTMLElement) => ({
        root: rootObj.root,
        target
      }))
      : [];

    this.trigger$.emit(result);
  }

  addTarget(target: HTMLElement, rootElement?: HTMLElement | Window) {
    const root = this.getRoot(rootElement);
    const rootObj = this.findRoot(root);

    if (rootObj && rootObj.targets.indexOf(target) < 0) {
      rootObj.targets.push(target);
    } else {
      this.roots.push({
        root,
        targets: [
          target
        ]
      });
    }
  }

  removeTarget(target: HTMLElement, rootElement?: HTMLElement | Window) {
    const root = this.getRoot(rootElement);
    const rootObj = this.findRoot(root);

    if (rootObj) {
      const idx = rootObj.targets.indexOf(target);
      if (idx >= 0) {
        rootObj.targets.splice(idx, 1);
      }
    }
  }

  getRoot(rootElement: any) {
    return (rootElement instanceof HTMLElement) ? rootElement : window;
  }

  findRoot(root: HTMLElement | Window) {
    return this.roots.find((item) => item.root === root);
  }
}
