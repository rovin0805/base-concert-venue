import { generateNewBand } from '@/__tests__/__mocks__/fakeData/newBand';
import { generateRandomId } from '@/lib/features/reservations/utils';

it('should load refreshed page from cache after new band is added', () => {
  // check that new band is not on page
  cy.task('resetDB').visit('/bands');
  cy.findByRole('heading', { name: /avalanche of cheese/i }).should(
    'not.exist'
  );

  // add new band via post request to api
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);
  const secret = Cypress.env('REVALIDATION_SECRET');

  cy.request('POST', `/api/bands?secret=${secret}`, { newBand }).then(
    (response) => {
      expect(response.body.revalidated).to.equal(true);
    }
  );

  // reload page:; new band should exist
  cy.reload();
  cy.findByRole('heading', { name: /avalanche of cheese/i }).should('exist');
});
