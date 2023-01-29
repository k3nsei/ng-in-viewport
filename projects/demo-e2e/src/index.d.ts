/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    assertColumnItems(column: 'first' | 'second', start: number, end?: number): void;
  }
}
