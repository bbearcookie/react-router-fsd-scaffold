import { fallbackLanguage, supportedLanguages, type SupportedLanguage } from '../config/languages';

/** URL 경로에서 언어를 추출합니다. 없으면 fallbackLanguage를 반환합니다. */
const getLanguageFromPath = (pathname: string): SupportedLanguage | null => {
  const language = pathname.split('/')[1];
  return supportedLanguages.includes(language as SupportedLanguage)
    ? (language as SupportedLanguage)
    : null;
};

/** 요청 URL에서 언어를 추출합니다. */
const detectLanguage = (request: Request) => {
  const url = new URL(request.url);
  const language = getLanguageFromPath(url.pathname);

  return language || fallbackLanguage;
};

export { getLanguageFromPath, detectLanguage };
