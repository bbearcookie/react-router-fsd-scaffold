import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vitePreviewHtmlPlugin } from './src/app/plugins/vitePreviewHtmlPlugin';

const isStorybook = process.argv.some((arg) => arg.includes('storybook'));
const isVitest = process.env.VITEST === 'true';

export default defineConfig({
  plugins: [
    tailwindcss(),
    !isStorybook && !isVitest && reactRouter(),
    tsconfigPaths(),
    vitePreviewHtmlPlugin(),
  ],
});
