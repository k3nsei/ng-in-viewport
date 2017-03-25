import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export abstract class InViewportService {
  public trigger$: EventEmitter<any>;

  constructor() {}

  abstract onChanges(...args: Array<any>): void;

  abstract addTarget(target: HTMLElement, rootElement?: HTMLElement | Window): void;

  abstract removeTarget(target: HTMLElement, rootElement?: HTMLElement | Window): void;
}
