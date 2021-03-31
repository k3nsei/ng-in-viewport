/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { InViewportConfigDirection } from './in-viewport-config-direction';
import { InViewportConfigCheckFn, InViewportConfigDirections } from './types';

export const isObject = (value: unknown): value is Record<string | number | symbol, any> =>
  !!value && Object.prototype.toString.call(value) === '[object Object]';

export const isNotEmptyArray = <T = any>(value: unknown): value is T[] => Array.isArray(value) && !!value.length;

export function isPlatformBrowser(): boolean {
  try {
    // @ts-ignore TS wants to know type of `this` variable
    return typeof this !== 'undefined' && this === window;
  } catch (e) {
    return false;
  }
}

export function isPlatformServer(): boolean {
  try {
    // @ts-ignore TS wants to know type of `this` and `global` variables
    return typeof this !== 'undefined' && typeof global !== 'undefined' && this === global;
  } catch (e) {
    return false;
  }
}

export function toBase64Browser(input: string): string {
  try {
    // @ts-ignore TS wants to know type of `this` variable
    return this.btoa(input);
  } catch (e) {
    return input;
  }
}

export const toBase64Server = (input: string): string => {
  try {
    return global.Buffer.from(input).toString('base64');
  } catch (e) {
    return input;
  }
};

export const toBase64 = (input: string): string => {
  const encodedInput = encodeURI(input);

  if (isPlatformBrowser()) {
    return toBase64Browser(encodedInput);
  }

  if (isPlatformServer()) {
    return toBase64Server(encodedInput);
  }

  return encodedInput;
};

export const stringifyObject = (input: unknown): string => {
  if (Array.isArray(input)) {
    return `[${input.map(stringifyObject).join(',')}]`;
  } else if (isObject(input)) {
    return Object.keys(input)
      .sort()
      .map((key: string): string => `${key}:${stringifyObject((input as { [K: string]: any })[key])}`)
      .join('|');
  }
  return String(input);
};

export const withRoot = (value: unknown): Element | undefined =>
  value && value instanceof Element && value.nodeType === 1 ? value : undefined;

export const withRootMargin = (value: unknown): string => {
  if (!value || typeof value !== 'string') {
    return '0px 0px 0px 0px';
  }

  const marginString: string = value || '0px';
  const regExp = new RegExp('\\s+');
  const margins: string[] = marginString.split(regExp).map((margin) => {
    const parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);

    if (!parts) {
      throw new TypeError('rootMargin must be specified in pixels or percent');
    }

    return `${parts[1]}${parts[2]}`;
  });

  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins.join(' ');
};

const DEFAULT_THRESHOLD = [0, 1];

export const isValidThreshold = (value: unknown): value is number =>
  typeof value === 'number' && value >= 0 && value <= 1;

export const withThreshold = (value: unknown): number[] => {
  let threshold: number[] = [];

  if (isNotEmptyArray<number>(value)) {
    threshold = value.filter((val: number): boolean => isValidThreshold(val));
  } else if (isValidThreshold(value)) {
    threshold = [value];
  }

  if (threshold.length === 0) {
    threshold = [...DEFAULT_THRESHOLD];
  }

  return threshold;
};

export const withPartial = (partial: unknown = true): boolean => !!partial;

const VALID_DIRECTIONS: InViewportConfigDirections[] = [
  InViewportConfigDirection.BOTH,
  InViewportConfigDirection.HORIZONTAL,
  InViewportConfigDirection.VERTICAL
];

export const isValidDirection = (value: unknown): value is InViewportConfigDirections =>
  !!VALID_DIRECTIONS.find((item: InViewportConfigDirections): boolean => item === value);

export const withDirection = (value: unknown): InViewportConfigDirections =>
  isValidDirection(value) ? value : InViewportConfigDirection.BOTH;

export const withCheckFn = (value: unknown): InViewportConfigCheckFn | undefined =>
  typeof value === 'function' ? (value as InViewportConfigCheckFn) : undefined;
