/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  projects: ['<rootDir>/projects/ng-in-viewport', '<rootDir>/projects/demo'],
  coverageDirectory: '<rootDir>/coverage/all',
  coverageProvider: 'v8',
  coverageReporters: ['lcov', 'text']
};
