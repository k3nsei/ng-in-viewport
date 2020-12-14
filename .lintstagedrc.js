/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  '.all-contributorsrc': function generateContributorsList() {
    return 'yarn contributors:generate';
  },
  'projects/ng-in-viewport/src/**/*.{js,ts}': function lintNgInViewport() {
    return 'yarn lint:lib';
  },
  'projects/demo/src/**/*.{js,ts}': function lintDemo() {
    return 'yarn lint:demo';
  },
  'projects/demo-e2e/src/**/*.{js,ts}': function lintDemo() {
    return 'yarn lint:demo-e2e';
  }
};
