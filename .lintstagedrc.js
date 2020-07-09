/*******************************************************************************
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 * (https://www.linkedin.com/in/piotrstepniewski/)
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://opensource.org/licenses/MIT
 */

module.exports = {
  '.all-contributorsrc': function generateContributorsList() {
    return 'all-contributors generate';
  },
  'projects/ng-in-viewport/src/**/*.ts': function lint() {
    return 'ng lint ng-in-viewport';
  }
};
