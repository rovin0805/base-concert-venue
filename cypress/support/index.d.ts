// https://stackoverflow.com/questions/69927966/argument-type-string-is-not-assignable-to-parameter-type-keyof-chainable-in-c

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     * @example cy.clickOnMyJourneyInCandidateCabinet()
     */
    resetDbAndIsrCache(): Chainable<null>;
  }
}
