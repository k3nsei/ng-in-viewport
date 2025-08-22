import type { Config } from 'jest';

const jestConfig = {
  displayName: 'example',
  preset: 'jest-preset-angular',
  moduleNameMapper: {
    'ng-in-viewport': '<rootDir>/../ng-in-viewport/src/public-api.ts',
    '^lodash-es$': 'lodash',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coverageDirectory: '<rootDir>/../../coverage/example',
  coverageReporters: ['lcovonly', 'text', 'html-spa'],
} satisfies Config;

export default jestConfig;
