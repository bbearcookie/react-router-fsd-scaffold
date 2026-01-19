import { mapValues } from 'es-toolkit/object';
import {
  LANG,
  fallbackLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from '../config/languages';

const isServer = typeof window === 'undefined';

/** URL 경로에서 언어를 추출합니다. 없으면 fallbackLanguage를 반환합니다. */
const getLanguageFromPath = (pathname: string): SupportedLanguage | null => {
  const language = pathname.split('/')[1];
  return supportedLanguages.includes(language as SupportedLanguage)
    ? (language as SupportedLanguage)
    : null;
};

/** 현재 경로의 언어를 새로운 언어로 변경한 경로를 반환합니다. */
const getChangedLanguagePath = (currentPath: string, newLanguage: SupportedLanguage) => {
  const currentLanguage = getLanguageFromPath(currentPath);

  if (currentLanguage) {
    return currentPath.replace(`/${currentLanguage}`, `/${newLanguage}`);
  } else {
    return `/${newLanguage}${currentPath}`;
  }
};

/** 요청 URL에서 언어를 추출합니다. */
const detectLanguage = (request: Request) => {
  const url = new URL(request.url);
  const language = getLanguageFromPath(url.pathname);

  return language || fallbackLanguage;
};

/** 언어를 추가한 경로를 반환합니다. (중첩 객체 지원) */
const wrapWithLanguage = <T extends Record<string, unknown>>(routes: T): T => {
  const language = isServer ? undefined : getLanguageFromPath(window.location.pathname);

  return mapValues(routes, (value) => {
    if (isServer) {
      return value;
    }

    // 함수인 경우: 언어 래핑 적용
    if (typeof value === 'function') {
      return (...args: unknown[]) => {
        const result = value(...args) as string;
        // LANG 변수를 현재 언어로 치환
        if (language) {
          return result.replace(LANG, language);
        } else {
          // 언어가 없으면 LANG/ 부분을 제거
          return result.replace(`${LANG}/`, '');
        }
      };
    }

    // 문자열인 경우: 직접 언어 래핑 적용
    if (typeof value === 'string') {
      // LANG 변수를 현재 언어로 치환
      if (language) {
        return value.replace(LANG, language);
      } else {
        // 언어가 없으면 LANG/ 부분을 제거
        return value.replace(`${LANG}/`, '');
      }
    }

    // 객체인 경우: 재귀적으로 처리
    if (typeof value === 'object' && value !== null) {
      return wrapWithLanguage(value as Record<string, unknown>);
    }

    return value;
  }) as T;
};

export { getLanguageFromPath, getChangedLanguagePath, detectLanguage, wrapWithLanguage };
