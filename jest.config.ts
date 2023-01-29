import type { Config } from 'jest';

const jestConfig = {
  projects: ['<rootDir>/projects/ng-in-viewport', '<rootDir>/projects/demo', '<rootDir>/projects/example'],
  coverageDirectory: '<rootDir>/coverage/all',
  coverageProvider: 'v8',
  coverageReporters: ['lcovonly', 'text'],
} satisfies Config;

export default jestConfig;
