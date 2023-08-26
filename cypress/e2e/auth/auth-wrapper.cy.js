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

it('runs auth flow for protected page, including failed login in', () => {
  // visit user page
  cy.task('resetDB').visit('/user');

  // check for sign in form
  cy.findByRole('heading', { name: /sign in to your account/i }).should(
    'exist'
  );

  // check there is no welcome message
  cy.findByRole('heading', { name: /welcome/i }).should('not.exist');

  // fill out sign in form with env variable values, but wrong password
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env('TEST_USER_EMAIL'));
  cy.findByLabelText(/password/i)
    .clear()
    .type('wrongpassword');

  // submit the form
  cy.findByRole('main').within(() => {
    cy.findByRole('button', { name: /sign in/i }).click();
  });

  // check for failure message
  cy.findByText(/sign in failed/i).should('exist');

  // fill out the sign in form with correct info
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

  // check that the use page now shows
  cy.findByRole('heading', { name: /welcome/i }).should('exist');
  cy.findByRole('heading', { name: /your tickets/i }).should('exist');

  // check for user and sign-out button on nav bar
  cy.findByRole('button', { name: Cypress.env('TEST_USER_EMAIL') }).should(
    'exist'
  );
  cy.findByRole('button', { name: /sign out/i }).should('exist');
});

it('redirects to sign-in page for protected pages', () => {
  cy.fixture('protected-pages.json').then((urls) => {
    urls.forEach(($url) => {
      cy.visit($url);
      cy.findByLabelText(/email address/i).should('exist');
      cy.findByLabelText(/password/i).should('exist');
    });
  });
});

it('does not show sign-in page when already signed in', () => {
  cy.task('resetDB').signIn(
    Cypress.env('TEST_USER_EMAIL'),
    Cypress.env('TEST_PASSWORD')
  );

  // access reservations page for 1st show
  cy.visit('/reservations/0');

  // make sure there is no sign-in form
  cy.findByRole('heading', { name: /sign in to your account/i }).should(
    'not.exist'
  );

  // make sure ticket purchase button shows
  cy.findByRole('button', { name: /purchase/i }).should('exist');
});
