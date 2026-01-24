import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fallbackLanguage, supportedLanguages, type SupportedLanguage } from '../config/languages';
import resourcesToBackend from 'i18next-resources-to-backend';

const setupI18n = async (i18next: typeof i18n, language?: SupportedLanguage) => {
  const options: InitOptions = {
    supportedLngs: supportedLanguages,
    fallbackLng: fallbackLanguage,
    lng: language || fallbackLanguage,
  };

  await i18next
    .use(initReactI18next)
    .use(
      resourcesToBackend(async (language: string) => {
        const isServer = typeof window === 'undefined';
        const isTestRunner = process.env.NODE_ENV === 'test';

        if (isServer || isTestRunner) {
          const fs = await import('node:fs/promises');
          const path = await import('node:path');
          const filePath = path.join(process.cwd(), 'public', 'locales', `${language}.json`);
          const fileContent = await fs.readFile(filePath, 'utf-8');
          return JSON.parse(fileContent);
        } else {
          const response = await fetch(`${import.meta.env.BASE_URL}locales/${language}.json`);
          return response.json();
        }
      }),
    )
    .init(options);
};

export { i18n, setupI18n };
