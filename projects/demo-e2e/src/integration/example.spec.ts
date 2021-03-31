/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { ExampleSectionId } from '../support/example.po';
import { getExampleComponent, getSection, getSectionItem } from '../support/example.po';

describe('ExampleComponent', () => {
  beforeEach(() => cy.visit('/'));

  it('should render component', () => {
    getExampleComponent().should('exist').should('be.visible');
  });

  describe('first section', () => {
    const sectionId: ExampleSectionId = 'first';
    const firstItemIndex: number = 0;
    const lastItemIndex: number = 99;

    it('should render section', () => {
      getSection(sectionId).should('be.visible');
    });

    it('should render first item', () => {
      getSectionItem(sectionId, firstItemIndex).should('be.visible').should('have.class', 'item--active');
      cy.scrollTo('bottom');
      getSectionItem(sectionId, firstItemIndex).should('not.have.class', 'item--active');
    });

    it('should render last item', () => {
      getSectionItem(sectionId, lastItemIndex).should('be.visible').should('not.have.class', 'item--active');
      cy.scrollTo('bottom');
      getSectionItem(sectionId, lastItemIndex).should('have.class', 'item--active');
    });
  });

  describe('second section', () => {
    const sectionId: ExampleSectionId = 'second';
    const firstItemIndex: number = 0;
    const lastItemIndex: number = 99;

    it('should render section', () => {
      getSection(sectionId).should('be.visible');
    });

    it('should render first item', () => {
      getSectionItem(sectionId, firstItemIndex).should('be.visible').should('have.class', 'item--active');
      cy.scrollTo('bottom');
      getSectionItem(sectionId, firstItemIndex).should('be.visible').should('have.class', 'item--active');
      cy.scrollTo('top');
      getSection(sectionId).scrollTo('bottom');
      getSectionItem(sectionId, firstItemIndex).should('not.be.visible').should('not.have.class', 'item--active');
    });

    it('should render last item', () => {
      getSectionItem(sectionId, lastItemIndex).should('not.be.visible').should('not.have.class', 'item--active');
      cy.scrollTo('bottom');
      getSectionItem(sectionId, lastItemIndex).should('not.be.visible').should('not.have.class', 'item--active');
      cy.scrollTo('top');
      getSection(sectionId).scrollTo('bottom');
      getSectionItem(sectionId, lastItemIndex).should('be.visible').should('have.class', 'item--active');
    });
  });
});
