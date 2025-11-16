const supportedLanguages = ['ko', 'en', 'ja'] as const;
const fallbackLanguage = 'ko';

type SupportedLanguage = (typeof supportedLanguages)[number];
export { supportedLanguages, fallbackLanguage, type SupportedLanguage };
