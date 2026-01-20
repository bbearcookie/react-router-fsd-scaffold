import { type Plugin } from 'vite';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';

/** 프리뷰 서버에서 경로별 HTML 파일을 서빙하는 플러그인 */
const vitePreviewHtmlPlugin = (): Plugin => {
  return {
    name: 'vite-preview-html-plugin',
    configurePreviewServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = req.url || '/';
        const pathname = url.split('?')[0].split('#')[0];

        // 정적 파일 요청은 그대로 처리 (확장자가 있는 경우)
        if (pathname.includes('.') && !pathname.endsWith('/')) {
          return next();
        }

        const distPath = join(process.cwd(), 'dist/client');

        // 1. 경로에 해당하는 prerender된 HTML이 있는지 확인
        if (pathname !== '/') {
          const htmlPath = join(distPath, pathname, 'index.html');
          try {
            const html = readFileSync(htmlPath, 'utf-8');
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
          } catch {
            // 파일이 없으면 계속 진행
          }
        }

        // 2. 인덱스 페이지라면 index.html 사용
        if (pathname === '/') {
          const indexPath = join(distPath, 'index.html');
          try {
            const html = readFileSync(indexPath, 'utf-8');
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
          } catch {
            // 파일이 없으면 계속 진행
          }
        }

        // 3. 위 두 경우가 아니면 __spa-fallback.html 사용
        const fallbackPath = join(distPath, '__spa-fallback.html');
        try {
          const html = readFileSync(fallbackPath, 'utf-8');
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
          return;
        } catch {
          // fallback도 없으면 기본 동작
          next();
        }
      });
    },
  };
};

export { vitePreviewHtmlPlugin };
