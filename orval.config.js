import { defineConfig } from 'orval';

export default defineConfig({
  'api-generated': {
    input: 'petstore.json',
    output: {
      prettier: true,
      tsconfig: 'tsconfig.app.json',
      target: './src/shared/api/openapiGenerated.ts',
      override: {
        mutator: {
          path: './src/shared/api/apiClient.ts',
          name: 'apiClient',
        },
      },
    },
  },
});
