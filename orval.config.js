import { defineConfig } from 'orval';

const INPUT_PATH = 'petstore.json';

export default defineConfig({
  api: {
    input: INPUT_PATH,
    output: {
      prettier: true,
      mock: true, // MSW 생성
      target: './src/shared/api/generated.ts',
      tsconfig: 'tsconfig.app.json',
      override: {
        useNamedParameters: true,
        mutator: {
          path: './src/shared/api/apiClient.ts',
          name: 'apiClient',
        },
      },
    },
  },
});
