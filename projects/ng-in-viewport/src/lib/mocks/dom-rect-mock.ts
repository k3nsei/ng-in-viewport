/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

export const domRectFactory = (options?: Partial<DOMRectReadOnly>): DOMRectReadOnly => {
  const { x = 0, y = 0, width = 0, height = 0, top = 0, bottom = 0, left = 0, right = 0 } = options || {};
  const domRect: Omit<DOMRectReadOnly, 'toJSON'> = { x, y, width, height, top, bottom, left, right };

  return {
    ...domRect,
    toJSON: () => JSON.stringify(domRect)
  };
};
