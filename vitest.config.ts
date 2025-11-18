import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/shared/testing-library/setupTests.ts'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.e2e.{ts,tsx,js,jsx}', '**/tests/**'],
    },
  }),
);
