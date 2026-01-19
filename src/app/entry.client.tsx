import { createInstance } from 'i18next';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import { I18nextProvider } from 'react-i18next';
import './style/index.css';
import { setupServiceWorker } from './lib/serviceWorker';
import React from 'react';
import { getLanguageFromPath, setupI18n } from '@/shared/i18n';

async function main() {
  const i18n = createInstance();

  await Promise.all([
    setupI18n(i18n, getLanguageFromPath(window.location.pathname) || undefined),
    setupServiceWorker(),
  ]);

  hydrateRoot(
    document,
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <HydratedRouter />
      </I18nextProvider>
    </React.StrictMode>,
  );
}

main().catch((error) => console.error(error));
