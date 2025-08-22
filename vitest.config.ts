import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    workspace: [
      'projects/ng-in-viewport/vitest.config.ts',
      'projects/demo/vitest.config.ts',
      'projects/example/vitest.config.ts',
    ],
    exclude: ['e2e/**/*'],
    coverage: {
      provider: 'v8',
      reporter: ['lcovonly', 'text', 'html'],
      reportsDirectory: 'coverage/all',
    },
  },
});
