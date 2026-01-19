import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { getQueryClient } from '../../tanstack-query/lib/queryClient';
import { createInstance, type i18n as I18nInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { setupI18n } from '@/shared/i18n';

const createTestI18n = async () => {
  const i18n = createInstance();
  await setupI18n(i18n, 'ko');
  return i18n;
};

const Wrapper = ({ children, i18n }: { children: React.ReactNode; i18n: I18nInstance }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={getQueryClient()}>
        <BrowserRouter>
          <Suspense>{children}</Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

const customRender = async (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const i18n = await createTestI18n();

  return {
    user: userEvent.setup(),
    i18n,
    ...render(ui, {
      wrapper: ({ children }) => <Wrapper i18n={i18n}>{children}</Wrapper>,
      ...options,
    }),
  };
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';

// eslint-disable-next-line import/export
export { customRender as render };
