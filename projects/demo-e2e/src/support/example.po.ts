/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

export type ExampleSectionId = 'first' | 'second';

export const getExampleComponent = (): Chainable<JQuery<HTMLElement>> => cy.get('invp-example');

export const getSection = (sectionId: ExampleSectionId): Chainable<JQuery<HTMLElement>> =>
  getExampleComponent().find(`.example.example--${sectionId}`);

export const getSectionItem = (sectionId: ExampleSectionId, itemIndex: number): Chainable<JQuery<HTMLElement>> =>
  getSection(sectionId).find(`.item:eq(${itemIndex})`);
