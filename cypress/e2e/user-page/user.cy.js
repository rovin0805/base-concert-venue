it("displays Shows page after clicking 'purchase more tickets' button", () => {
  // log in using custom command
  cy.task('resetDB').signIn(
    Cypress.env('TEST_USER_EMAIL'),
    Cypress.env('TEST_PASSWORD')
  );

  // access user page
  cy.visit('/user');

  // find and click 'purchase more tickets' button
  cy.findByRole('button', { name: /purchase more tickets/i }).click();

  // confirm "Shows" page shows
  cy.findByRole('heading', { name: /upcoming shows/i }).should('exist');
});
