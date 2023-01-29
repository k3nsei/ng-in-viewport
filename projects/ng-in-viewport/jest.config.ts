import type { Config } from 'jest';

const jestConfig: Config = {
  displayName: 'ng-in-viewport',
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: { '^lodash-es$': 'lodash' },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coverageDirectory: '<rootDir>/../../coverage/ng-in-viewport',
  coverageProvider: 'v8',
  coverageReporters: ['lcovonly', 'text'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/mocks/'],
};

export default jestConfig;
