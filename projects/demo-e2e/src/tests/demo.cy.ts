describe('GIVEN: Demo Application', () => {
  describe('WHEN page was loaded', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('THEN should render title', () => {
      cy.get('.app-header__title').contains('ng-in-viewport demo').should('be.visible');
    });

    it('THEN should render 1st column', () => {
      cy.get('.example--first').should('be.visible').should('not.be.empty');
    });

    it('THEN 1st column items from 1st to 9th should be active', () => {
      cy.assertColumnItems('first', 1, 9);
    });

    it('THEN should render 2nd column', () => {
      cy.get('.example--second').should('be.visible').should('not.be.empty');
    });

    it('THEN 2nd column items from 1st to 7th should be active', () => {
      cy.assertColumnItems('second', 1, 7);
    });

    describe('AND scrolled into view 10th item of 1st column', () => {
      beforeEach(() => cy.get('.example--first .item:nth-child(10)').scrollIntoView());

      it('THEN 1st column items from 10th to 18th should be active', () => {
        cy.assertColumnItems('first', 10, 18);
      });

      it('THEN 2nd column items from 1st to 7th should be active', () => {
        cy.assertColumnItems('second', 1, 7);
      });
    });

    describe('AND scrolled 2st column vertically by 779px', () => {
      beforeEach(() => cy.get('.example--second').scrollTo(0, 779));

      it('THEN 1st column items from 1st to 9th should be active', () => {
        cy.assertColumnItems('first', 1, 9);
      });

      it('THEN 2nd column items from 11th to 17th should be active', () => {
        cy.assertColumnItems('second', 11, 17);
      });
    });
  });
});
