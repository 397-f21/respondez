describe('Test App', () => {
    it('launches', () => {
        cy.visit('/');
    });

    it('opens with a create form button', () => {
        cy.visit('/');
        cy.get('[data-cy=createFormCy]').should('contain', 'Create Form');
    });

    it('shows the capacity and waitlist checkbox when capacity limit is clicked', () => {
        cy.visit('/create');
        cy.get('[data-cy=capacityCy]').click();
        cy.get('[data-cy=waitlistDivCy]').should('be.visible');
    });
});

describe('newtest', () => {
  it('prevents user from create event and fill response before loggin in', () => {
      cy.visit('/');
      cy.get('[data-cy=menuButtonCy]').click();
      cy.get('[data-cy=navigationCy]').should('contain', 'Sign In');
      cy.get('[data-cy=navigationCy]').should('contain', 'Create Form');
      cy.get('[data-cy=navigationCy]').should('contain', 'Fill Response');
      cy.get('[data-cy=createFormCy]').click();
      cy.get('[data-cy=loginModalCy]').should('contain', 'Sign In');
  });
});