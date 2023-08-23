import { defineConfig } from 'cypress';
import { addBand } from './lib/features/bands/queries';
import { resetDB } from './__tests__/__mocks__/db/utils/reset-db';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // to access within a test function:
      // Cypress.env("REVALIDATION_SECRET"")
      config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

      // implement node event listeners here
      on('task', {
        resetDB() {
          resetDB();
          return null;
        },

        addBand: (newBand) => {
          addBand(newBand);
          return null;
        },
      });

      return config;
    },
  },
});
