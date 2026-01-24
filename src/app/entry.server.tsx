import { PassThrough } from 'node:stream';
import { createInstance } from 'i18next';
import type { EntryContext } from 'react-router';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter } from 'react-router';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import 'dotenv/config';
import { setupI18n } from '@/shared/i18n';
import { detectLanguage } from '@/shared/i18n/util/language';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  const i18n = createInstance();
  await setupI18n(i18n, detectLanguage(request));

  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <I18nextProvider i18n={i18n}>
        <ServerRouter context={routerContext} url={request.url} />
      </I18nextProvider>,
      {
        onShellReady() {
          responseHeaders.set('Content-Type', 'text/html');

          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
      },
    );
  });
}
