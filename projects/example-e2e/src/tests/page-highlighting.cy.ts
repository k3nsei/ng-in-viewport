describe('GIVEN: Example Application', () => {
  describe('WHEN page was loaded', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('THEN title should be rendered', () => {
      cy.get('.toolbar-label').contains('Example of ng-in-viewport').should('be.visible');
    });

    it('THEN `highlighting` navigation tab should be active', () => {
      cy.get('nav a.is-active').contains('Highlighting').should('be.visible');
    });
  });
});
