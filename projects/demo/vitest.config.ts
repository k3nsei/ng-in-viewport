import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'demo',
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, 'vitest-setup.ts')],
    include: ['src/**/*.spec.ts'],
    exclude: ['e2e/**/*'],
    alias: {
      'ng-in-viewport': resolve(__dirname, '../ng-in-viewport/src/public-api.ts'),
      'lodash-es': 'lodash',
    },
    coverage: {
      provider: 'v8',
      reporter: ['lcovonly', 'text', 'html'],
      reportsDirectory: '../../coverage/demo',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
