describe('Static routes', () => {
  it('displays correct heading when navigating /shows route', () => {
    cy.visit('/');
    cy.findByRole('button', { name: /shows/i }).click();
    cy.findByRole('heading', { name: /upcoming shows/i }).should('exist');
  });

  it('displays correct heading when navigating /bands route', () => {
    cy.visit('/');
    cy.findByRole('button', { name: /bands/i }).click();
    cy.findByRole('heading', { name: /Our Illustrious Performers/i }).should(
      'exist'
    );
  });
});
