import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { i18n } from '@/shared/i18n';
import { getQueryClient } from '@/shared/tanstack-query/lib/queryClient';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={i18n.language}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google" content="notranslate" />
        <title>My App</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
