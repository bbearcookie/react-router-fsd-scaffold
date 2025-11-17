import { defineConfig } from 'orval';

export default defineConfig({
  'api-generated': {
    input: 'petstore.json',
    output: {
      prettier: true,
      tsconfig: 'tsconfig.app.json',
      target: './src/shared/api/openapiGenerated.ts',
      override: {
        useNamedParameters: true,
        mutator: {
          path: './src/shared/lib/apiClient.ts',
          name: 'apiClient',
        },
      },
    },
  },
});
