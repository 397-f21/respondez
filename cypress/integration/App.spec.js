describe('Test App', () => {
    it('launches', () => {
        cy.visit('/');
    });

    it('opens with a create form button', () => {
        cy.visit('/');
        cy.get('[data-cy=createFormCy]').should('contain', 'Create Form');
    });
});