/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  displayName: 'ng-in-viewport',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coverageDirectory: '<rootDir>/../../coverage/ng-in-viewport',
  coverageProvider: 'v8',
  coverageReporters: ['lcov', 'text']
};
