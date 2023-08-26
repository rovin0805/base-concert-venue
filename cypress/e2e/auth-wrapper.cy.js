it('runs auth flow for successful login to protected reservation page', () => {
  // visit reservations page for the 1st show id:0
  cy.task('resetDB').visit('/reservations/0');

  // check for sign in form
  cy.findByRole('heading', { name: /sign in to your account/i }).should(
    'exist'
  );

  // check that there is no options to purchase tickets
  cy.findByRole('button', { name: /purchase/i }).should('not.exist');

  // enter valid sign-in credentials
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env('TEST_USER_EMAIL'));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env('TEST_PASSWORD'));

  // submit the form
  cy.findByRole('main').within(() => {
    cy.findByRole('button', { name: /sign in/i }).click();
  });

  // check for purchase button and band name
  cy.findByRole('button', { name: /purchase/i }).should('exist');
  cy.findByRole('heading', { name: /The Wandering Bunnies/i }).should('exist');

  // check for email and sign-out button for nav bar
  cy.findByRole('button', { name: Cypress.env('TEST_USER_EMAIL') }).should(
    'exist'
  );
  cy.findByRole('button', { name: /sign out/i }).should('exist');

  // check that sign in button does not exist
  cy.findByRole('button', { name: /sign in/i }).should('not.exist');
});
