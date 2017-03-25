import { EventEmitter, Injectable } from "@angular/core";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/debounceTime";
import { Observable } from "rxjs/Observable";
import { InViewportService } from "./in-viewport.service";

@Injectable()
export class InViewportEventsService extends InViewportService {
  private scrollListener: any;
  private resizeListener: any;
  private domListener: any;
  private roots: Array<any>;

  public trigger$: EventEmitter<any>;

  constructor() {
    super();

    this.trigger$ = new EventEmitter();

    this.roots = [];

    this.scrollListener = Observable
      .fromEvent(window, 'scroll', { passive: true })
      .debounceTime(50)
      .subscribe((event) => this.onChanges());

    this.resizeListener = Observable
      .fromEvent(window, 'resize', { passive: true })
      .debounceTime(50)
      .subscribe((event) => this.onChanges());

    if (window && 'MutationObserver' in window) {
      this.domListener = new MutationObserver((mutations) => this.onChanges());
      // this.domListener.observe(document, {
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
