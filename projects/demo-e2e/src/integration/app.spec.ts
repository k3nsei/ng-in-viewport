/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { getContent, getHeader, getHeaderTitle } from '../support/app.po';

describe('AppComponent', () => {
  beforeEach(() => cy.visit('/'));

  it('should render header', () => {
    getHeader().should('exist').should('be.visible');
  });

  it('should render header title', () => {
    getHeaderTitle().should('be.visible').should('contain', 'ng-in-viewport demo');
  });

  it('should render content', () => {
    getContent().should('exist').should('be.visible');
  });
});
