import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    fileServerFolder: '../../dist/example/browser',
    fixturesFolder: 'src/fixtures',
    supportFolder: 'src/support',
    supportFile: 'src/support/e2e.ts',
    specPattern: 'src/tests/**/*.cy.ts',
    screenshotOnRunFailure: true,
    video: true,
    screenshotsFolder: 'artifacts/screenshots',
    videosFolder: 'artifacts/videos',
    viewportWidth: 800,
    viewportHeight: 600,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
