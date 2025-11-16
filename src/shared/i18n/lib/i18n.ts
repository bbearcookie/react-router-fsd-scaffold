import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fallbackLanguage, supportedLanguages, type SupportedLanguage } from '../config/languages';
import ja from '../assets/ja.json';
import ko from '../assets/ko.json';
import en from '../assets/en.json';

const initI18Next = async (i18next: typeof i18n, language?: SupportedLanguage) => {
  const options: InitOptions = {
    supportedLngs: supportedLanguages,
    fallbackLng: fallbackLanguage,
    lng: language || fallbackLanguage,
    resources: {
      ko: { translation: ko },
      en: { translation: en },
      ja: { translation: ja },
    },
  };

  await i18next.use(initReactI18next).init(options);
};

export { i18n, initI18Next };
