import { defineConfig, loadEnv } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vitePreviewHtmlPlugin } from './src/app/plugin/vitePreviewHtmlPlugin';

const isStorybook = process.argv.some((arg) => arg.includes('storybook'));
const isVitest = process.env.VITEST === 'true';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basename = env.VITE_BASE_NAME === '/' ? '/' : `${env.VITE_BASE_NAME}/`;

  return {
    base: basename,
    plugins: [
      tailwindcss(),
      !isStorybook && !isVitest && reactRouter(),
      tsconfigPaths(),
      vitePreviewHtmlPlugin(),
    ],
    build: {
      assetsDir: `assets`,
    },
  };
});
