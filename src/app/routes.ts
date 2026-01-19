import { route } from '@react-router/dev/routes';
// eslint-disable-next-line fsd/no-relative-imports
import { BASE_ROUTES } from '../shared/router';

export default [
  route(BASE_ROUTES.HOME(), '../pages/Page.tsx'),
  route(BASE_ROUTES.POSTS.LIST(), '../pages/posts/Page.tsx'),
  route(BASE_ROUTES.POSTS.DETAIL(':postId'), '../pages/posts/[postId]/Page.tsx'),
];
