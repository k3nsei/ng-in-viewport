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
    this.rootElement = options && options.rootElement ? options.rootElement : void 0;

    this.partial = options && 'partial' in options ? options.partial : true;

    this.direction = options && 'direction' in options ? options.direction : InViewportConfigDirection.Both;
  }

  get rootElement(): Element {
    return this._rootElement;
  }

  set rootElement(value: Element) {
    this._rootElement = value;
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
    this._direction = value;
  }
}
