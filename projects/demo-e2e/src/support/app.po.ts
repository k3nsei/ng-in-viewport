/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

export const getHeader = (): Chainable<JQuery<HTMLElement>> => cy.get('invp-app header.app-header');

export const getHeaderTitle = (): Chainable<JQuery<HTMLElement>> => getHeader().find('.app-header__title');

export const getContent = (): Chainable<JQuery<HTMLElement>> => cy.get('invp-app main.app-content');
