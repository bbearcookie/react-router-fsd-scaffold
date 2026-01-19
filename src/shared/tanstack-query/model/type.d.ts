import type { QueryKey } from '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      removes?: Array<QueryKey>;
      invalidates?: Array<QueryKey>;
    };
  }
}
