export const supportedLanguages = ['ko', 'en', 'ja'] as const;
export const fallbackLanguage = 'ko';
export const LANG = ':lang?';
export type SupportedLanguage = (typeof supportedLanguages)[number];
