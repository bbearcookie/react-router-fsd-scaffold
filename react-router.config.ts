import type { Config } from '@react-router/dev/config';

export default {
  basename: `${process.env.VITE_BASE_NAME}/`,
  appDirectory: 'src/app',
  buildDirectory: 'dist',
  ssr: false,
  prerender: ['/', '/ko', '/en'],
} satisfies Config;
