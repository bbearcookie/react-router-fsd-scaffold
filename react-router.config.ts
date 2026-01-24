import type { Config } from '@react-router/dev/config';

const basename = process.env.VITE_BASE_NAME === '/' ? '/' : `${process.env.VITE_BASE_NAME}/`;

export default {
  basename,
  appDirectory: 'src/app',
  buildDirectory: 'dist',
  ssr: false,
  prerender: ['/', '/ko', '/en'],
} satisfies Config;
