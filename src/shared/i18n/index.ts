export { i18n, initI18Next } from './lib/i18n';
export {
  LANG,
  supportedLanguages,
  fallbackLanguage,
  type SupportedLanguage,
} from './config/languages';
export { getLanguageFromPath, detectLanguage, wrapWithLanguage } from './util/language';
