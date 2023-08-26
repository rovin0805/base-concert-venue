import { generateRandomId } from '@/lib/features/reservations/utils';
import { generateNewBand } from '@/__tests__/__mocks__/fakeData/newBand';

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

describe('Dynamic routes', () => {
  it('displays correct band name for a /bands/:id route that existed at build time', () => {
    cy.task('resetDB').visit('/bands/1');
    cy.findByRole('heading', { name: /Shamrock Pete/i }).should('exist');
  });

  it('displays error for a band not in db', () => {
    cy.task('resetDB').visit('/bands/999');
    cy.findByRole('heading', { name: /band not found/i }).should('exist');
  });
});

describe('Routes created after build', () => {
  it('displays a name for a band that was not present at build time', () => {
    const bandId = generateRandomId();
    const newBand = generateNewBand(bandId);
    cy.task('resetDB').task('addBand', newBand).visit(`/bands/${bandId}`);
    cy.findByRole('heading', { name: newBand.name }).should('exist');
  });
});
