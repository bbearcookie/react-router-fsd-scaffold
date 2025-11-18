import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vitePreviewHtmlPlugin } from './src/app/plugins/vitePreviewHtmlPlugin';

export default defineConfig({
  plugins: [
    tailwindcss(),
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
    vitePreviewHtmlPlugin(),
  ],
});
