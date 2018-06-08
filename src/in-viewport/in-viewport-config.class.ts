import { InViewportUtils } from './in-viewport-utils';
import isObjectLiteral = InViewportUtils.isObjectLiteral;

export enum InViewportConfigDirection {
  Both,
  Vertical,
  Horizontal
}

export interface InViewportConfigOptions {
  rootElement?: any;
  partial?: boolean;
  direction?: InViewportConfigDirection;
}

export class InViewportConfig {
  protected _rootElement: Element;
  protected _partial: boolean;
  protected _direction: InViewportConfigDirection;

  constructor(options?: InViewportConfigOptions) {
    const exist = isObjectLiteral(options);
    this.rootElement = exist && options.hasOwnProperty('rootElement') ? options.rootElement : void 0;
    this.partial = exist && options.hasOwnProperty('partial') ? options.partial : true;
    this.direction = exist && options.hasOwnProperty('direction') ? options.direction : void 0;
  }

  get rootElement(): Element {
    return this._rootElement;
  }

  set rootElement(value: Element) {
    this._rootElement = value && value.nodeType === 1 ? value : void 0;
  }

  get partial(): boolean {
    return this._partial;
  }

  set partial(value: boolean) {
    this._partial = !!value;
  }

  get direction(): InViewportConfigDirection {
    return this._direction;
  }

  set direction(value: InViewportConfigDirection) {
    const availableOptions = [
      InViewportConfigDirection.Both,
      InViewportConfigDirection.Vertical,
      InViewportConfigDirection.Horizontal
    ];
    this._direction = availableOptions.indexOf(value) >= 0 ? value : InViewportConfigDirection.Both;
  }
}
