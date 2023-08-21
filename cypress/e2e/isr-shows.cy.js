// https://glebbahmutov.com/blog/ssr-e2e/
// This method won't work for multiple tests in the same file!

it('skips client-side bundle, confirming data from ISR cache', () => {
  cy.request('/shows')
    .its('body')
    .then((html) => {
      // remove the scripts, so they don't start automatically
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '');
      cy.state('document').write(staticHtml);
    });

  cy.findAllByText(/2022 apr 1[456]/i).should('have.length.of', 3);
});
