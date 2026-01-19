import { defineConfig } from 'orval';
import { config } from 'dotenv';

// .env 파일 로드
config();

const INPUT_PATH = 'src/shared/api/openapi.json';

export default defineConfig({
  api: {
    input: INPUT_PATH,
    output: {
      prettier: true,
      mock: {
        type: 'msw',
        locale: 'ko',
        delayFunctionLazyExecute: true, // delay 함수에 넣을 값을 런타임에 실행하도록 설정
        delay: () => (import.meta.env.MODE === 'test' ? 0 : 1000),
        baseUrl: process.env.VITE_API_URL,
      },
      target: './src/shared/api/generated.ts',
      tsconfig: 'tsconfig.app.json',
      override: {
        header: () =>
          `// eslint-disable-next-line @typescript-eslint/ban-ts-comment\n// @ts-nocheck\n`,
        useNamedParameters: false,
        mutator: {
          path: './src/shared/api/apiClient.ts',
          name: 'apiClient',
        },
      },
    },
  },
});
