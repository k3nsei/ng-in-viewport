export enum InViewportConfigDirection {
  BOTH = 'both',
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export interface InViewportConfigCheckFnOptions {
  force: boolean;
  config: InViewportConfig;
}

export type InViewportConfigCheckFn = (
  entry: IntersectionObserverEntry,
  options: InViewportConfigCheckFnOptions
) => any;

export interface InViewportConfigOptions {
  root?: Element;
  rootMargin?: string;
  threshold?: number | number[];
  partial?: boolean;
  direction?: InViewportConfigDirection;
  checkFn?: InViewportConfigCheckFn;
}

const DEFAULT_THRESHOLD = [0, 1];

export class InViewportConfig {
  private _root: Element;
  private _rootMargin: string = '0px 0px 0px 0px';
  private _threshold: number | number[] = [...DEFAULT_THRESHOLD];
  private _partial: boolean = true;
  private _direction: InViewportConfigDirection = InViewportConfigDirection.BOTH;
  private _checkFn: InViewportConfigCheckFn;

  constructor(options?: InViewportConfigOptions) {
    if (Object.prototype.toString.call(options) === '[object Object]') {
      ['root', 'rootMargin', 'threshold', 'partial', 'direction', 'checkFn'].forEach((prop) => {
        if (options.hasOwnProperty(prop)) {
          this[prop] = options[prop];
        }
      });
    }
  }

  public get root(): Element {
    return this._root;
  }

  public set root(value: Element) {
    this._root = value && value.nodeType === 1 ? value : undefined;
  }

  public get rootMargin(): string {
    return this._rootMargin;
  }

  public set rootMargin(value: string) {
    this._rootMargin = value && typeof value === 'string' ? value : '0px 0px 0px 0px';
  }

  public get threshold(): number | number[] {
    return this._threshold;
  }

  public set threshold(value: number | number[]) {
    let threshold = [];
    const isValidThreshold = (val: any) => typeof val === 'number' && val >= 0 && val <= 1;
    if (isValidThreshold(value)) {
      threshold = [value];
    } else if (Array.isArray(value) && value.length) {
      threshold = value.filter((val) => isValidThreshold(val));
    }
    if (threshold.length === 0) {
      threshold = [...DEFAULT_THRESHOLD];
    }
    this._threshold = threshold;
  }

  public get partial(): boolean {
    return this._partial;
  }

  public set partial(value: boolean) {
    this._partial = !!value;
  }

  public get direction(): InViewportConfigDirection {
    return this._direction;
  }

  public set direction(value: InViewportConfigDirection) {
    const isValidValue = (val: any) => {
      return (
        [
          InViewportConfigDirection.BOTH,
          InViewportConfigDirection.HORIZONTAL,
          InViewportConfigDirection.VERTICAL
        ].indexOf(val) >= 0
      );
    };
    this._direction = isValidValue(value) ? value : InViewportConfigDirection.BOTH;
  }

  public get checkFn(): InViewportConfigCheckFn {
    return this._checkFn;
  }

  public set checkFn(value: InViewportConfigCheckFn) {
    this._checkFn = value;
  }
}
