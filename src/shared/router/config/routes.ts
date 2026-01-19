import { LANG, wrapWithLanguage } from '../../i18n';

/** 라우팅 경로 정의 */
const BASE_ROUTES = {
  HOME: () => `/${LANG}` as const,
  POSTS: {
    LIST: () => `/${LANG}/posts` as const,
    DETAIL: (postId: string) => `/${LANG}/posts/${postId}` as const,
  } as const,
} as const;

const ROUTES = wrapWithLanguage(BASE_ROUTES);

export { BASE_ROUTES, ROUTES };
