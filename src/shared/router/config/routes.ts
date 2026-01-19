import { getLanguageFromPath } from '../../i18n';
import { mapValues } from 'es-toolkit/object';

/** 라우팅 경로 정의 */
const BASE_ROUTES = {
  HOME: () => '/',
  POSTS: () => '/posts',
  POST_DETAIL: (postId: string) => `/posts/${postId}`,
} as const;

const withLanguage = (path: string) => {
  const language = getLanguageFromPath(window.location.pathname);
  return language ? `/${language}${path}` : path;
};

const wrapWithLanguage = <T extends Record<string, (...args: any[]) => string>>(routes: T) =>
  mapValues(
    routes,
    (fn) =>
      (...args: any[]) =>
        withLanguage(fn(...args)),
  ) as { [K in keyof T]: (...args: Parameters<T[K]>) => string };

const ROUTES = wrapWithLanguage(BASE_ROUTES);

export { ROUTES };
