import type { Config } from 'jest';

const jestConfig: Config = {
  displayName: 'ng-in-viewport',
  preset: 'jest-preset-angular',
  // globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coverageDirectory: '<rootDir>/../../coverage/ng-in-viewport',
  coverageProvider: 'v8',
  coverageReporters: ['lcovonly', 'text', 'html-spa'],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 90,
      statements: 90,
    },
  },
  coveragePathIgnorePatterns: ['node_modules/', 'enums/', 'index.ts', 'public-api.ts', 'in-viewport.module.ts'],
};

export default jestConfig;
