import { inRange } from './utils';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('assertColumnItems', (column: 'first' | 'second', start: number, end?: number): void => {
  cy.get(`.example--${column} .item`).each(($el, index) => {
    const number = index + 1;

    inRange(number, start, end)
      ? cy.wrap($el).should('have.class', 'item--active')
      : cy.wrap($el).should('not.have.class', 'item--active');
  });
});
