export { i18n, setupI18n } from './lib/i18n';
export {
  LANG,
  supportedLanguages,
  fallbackLanguage,
  type SupportedLanguage,
} from './config/languages';
export { getLanguageFromPath, detectLanguage, wrapWithLanguage } from './util/language';
