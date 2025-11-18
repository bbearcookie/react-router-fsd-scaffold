import { isServer, QueryClient, type QueryClientConfig } from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
};

let browserQueryClient: QueryClient | undefined = undefined;

const makeQueryClient = () => new QueryClient(queryClientConfig);

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

export { getQueryClient };
