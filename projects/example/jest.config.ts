import type { Config } from 'jest';

const jestConfig = {
  displayName: 'example',
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: {
    'ng-in-viewport': '<rootDir>/../ng-in-viewport/src/public-api.ts',
    '^lodash-es$': 'lodash',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coverageDirectory: '<rootDir>/../../coverage/demo',
  coverageProvider: 'v8',
  coverageReporters: ['lcovonly', 'text', 'html-spa'],
} satisfies Config;

export default jestConfig;
