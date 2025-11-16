import { getLanguageFromPath } from '../i18n';

const withLanguage = (path: string) => {
  const language = getLanguageFromPath(window.location.pathname);
  return language ? `/${language}${path}` : path;
};

export const ROUTES = {
  HOME: () => withLanguage('/'),
  POSTS: () => withLanguage('/posts'),
  POST_DETAIL: (postId: string) => withLanguage(`/posts/${postId}`),
} as const;
