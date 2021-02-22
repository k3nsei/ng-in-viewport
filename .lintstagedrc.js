/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  '.all-contributorsrc': 'npx all-contributors generate',
  'projects/ng-in-viewport/src/**/*.{js,ts}': 'npx ng lint ng-in-viewport',
  'projects/demo/src/**/*.{js,ts}': 'npx ng lint demo',
  'projects/demo-e2e/src/**/*.{js,ts}': 'npx eslint "projects/demo-e2e/src/**/*.{js,ts}"',
  'projects/example/src/**/*.{js,ts}': 'npx ng lint example'
};
