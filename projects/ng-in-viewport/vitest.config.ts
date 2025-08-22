import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'ng-in-viewport',
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, 'vitest-setup.ts')],
    include: ['src/**/*.spec.ts'],
    exclude: ['e2e/**/*'],
    alias: {
      'lodash-es': 'lodash',
    },
    coverage: {
      provider: 'v8',
      reporter: ['lcovonly', 'text', 'html'],
      reportsDirectory: '../../coverage/ng-in-viewport',
      thresholds: {
        branches: 95,
        functions: 95,
        lines: 90,
        statements: 90,
      },
      exclude: ['node_modules/', '**/enums/**', '**/index.ts', '**/public-api.ts', '**/in-viewport.module.ts'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
