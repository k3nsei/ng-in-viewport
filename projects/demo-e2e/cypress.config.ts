import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    fileServerFolder: '../../dist/demo',
    fixturesFolder: 'src/fixtures',
    supportFolder: 'src/support',
    supportFile: 'src/support/e2e.ts',
    specPattern: 'src/tests/**/*.cy.ts',
    screenshotOnRunFailure: true,
    video: true,
    screenshotsFolder: 'artifacts/screenshots',
    videosFolder: 'artifacts/videos',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
