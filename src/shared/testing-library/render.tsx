import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { getQueryClient } from '../lib/queryClient';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <MemoryRouter>
        <Suspense>{children}</Suspense>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: Wrapper, ...options }),
});

// eslint-disable-next-line import/export
export * from '@testing-library/react';

// eslint-disable-next-line import/export
export { customRender as render };
