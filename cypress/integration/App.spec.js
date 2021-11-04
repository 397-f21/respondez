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