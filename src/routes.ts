import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', 'pages/Page.tsx'),
  route('*?', 'pages/NotFoundPage.tsx'),
] satisfies RouteConfig;
