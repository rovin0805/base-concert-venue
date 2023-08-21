it('skips client-side bundle, confirming data from ISR cache', () => {
  cy.request('/bands')
    .its('body')
    .then((html) => {
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '');
      cy.state('document').write(staticHtml);
    });

  cy.findByRole('heading', { name: /The Wandering Bunnies/i }).should('exist');
  cy.findByRole('heading', { name: /Shamrock Pete/i }).should('exist');
  cy.findByRole('heading', { name: /The Joyous Nun Riot/i }).should('exist');
});
