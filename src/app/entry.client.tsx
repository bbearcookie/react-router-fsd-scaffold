import i18n from 'i18next';
import React, { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import { I18nextProvider } from 'react-i18next';
import './styles/index.css';
import { getLanguageFromPath } from '@/shared/i18n';
import { initI18Next } from '@/shared/i18n/lib/i18n';

async function main() {
  await initI18Next(i18n, getLanguageFromPath(window.location.pathname) || undefined);

  startTransition(() => {
    hydrateRoot(
      document,
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <HydratedRouter />
        </I18nextProvider>
      </React.StrictMode>,
    );
  });
}

main().catch((error) => console.error(error));
