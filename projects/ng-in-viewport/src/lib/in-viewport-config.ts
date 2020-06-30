import { Base64 } from 'js-base64';

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

export class InViewportConfig {
  private static readonly DEFAULT_THRESHOLD = [0, 1];

  private static readonly STRINGIFY_DELIMITER = '|';

  private _root: Element;
  private _rootMargin: string = '0px 0px 0px 0px';
  private _threshold: number | number[] = [...InViewportConfig.DEFAULT_THRESHOLD];
  private _partial: boolean = true;
  private _direction: InViewportConfigDirection = InViewportConfigDirection.BOTH;
  private _hash: string;
  private _checkFn: InViewportConfigCheckFn;

  private static stringify(input: object): string {
    if (Array.isArray(input)) {
      const stringifiedArr = [];

      for (const v of input) {
        stringifiedArr.push(InViewportConfig.stringify(v));
      }

      return `[${stringifiedArr.join(',')}]`;
    } else if (typeof input === 'object' && input !== null) {
      const acc = [];
      const sortedKeys = Object.keys(input).sort();

      for (const k of sortedKeys) {
        const v = InViewportConfig.stringify(input[k]);

        acc.push(`${k}:${v}`);
      }

      return acc.join(InViewportConfig.STRINGIFY_DELIMITER);
    }

    return String(input);
  }

  private static hash(input: object): string {
    return Base64.encode(InViewportConfig.stringify(input));
  }

  constructor(options?: InViewportConfigOptions) {
    if (Object.prototype.toString.call(options) === '[object Object]') {
      ['root', 'rootMargin', 'threshold', 'partial', 'direction', 'checkFn'].forEach((prop) => {
        if (options.hasOwnProperty(prop)) {
          this[prop] = options[prop];
        }
      });
    }

    this._hash = InViewportConfig.hash({
      rootMargin: this.rootMargin,
      threshold: this.threshold,
      partial: this.partial,
      direction: this.direction,
      checkFn: String(this.checkFn)
    });
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
    if (!value || typeof value !== 'string') {
      this._rootMargin = '0px 0px 0px 0px';
    } else {
      const marginString: string = value || '0px';
      const margins: string[] = marginString.split(new RegExp('\\s+')).map((margin) => {
        const parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
        if (!parts) {
          throw new TypeError('rootMargin must be specified in pixels or percent');
        }
        return `${parts[1]}${parts[2]}`;
      });

      margins[1] = margins[1] || margins[0];
      margins[2] = margins[2] || margins[0];
      margins[3] = margins[3] || margins[1];

      this._rootMargin = margins.join(' ');
    }
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
      threshold = [...InViewportConfig.DEFAULT_THRESHOLD];
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

  public get hash(): string {
    return this._hash;
  }

  public get checkFn(): InViewportConfigCheckFn {
    return this._checkFn;
  }

  public set checkFn(value: InViewportConfigCheckFn) {
    this._checkFn = value;
  }
}
