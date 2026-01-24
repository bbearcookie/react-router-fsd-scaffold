import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import '@testing-library/jest-dom/vitest';

export default defineConfig((configEnv) =>
  mergeConfig(viteConfig(configEnv), {
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/shared/testing-library/config/vitest.setup.ts'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.e2e.{ts,tsx,js,jsx}', '**/tests/**'],
    },
  }),
);
