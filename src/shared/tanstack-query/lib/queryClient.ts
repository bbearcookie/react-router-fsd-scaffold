import { isServer, matchQuery, QueryClient, type QueryClientConfig } from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
    mutations: {
      onSuccess: (_data, _variables, _context, mutation) => {
        const queryClient = mutation.client;

        queryClient.removeQueries({
          predicate: (query) =>
            mutation.meta?.removes?.some((queryKey) => matchQuery({ queryKey }, query)) ?? true,
        });

        queryClient.invalidateQueries({
          predicate: (query) =>
            mutation.meta?.invalidates?.some((queryKey) => matchQuery({ queryKey }, query)) ?? true,
        });
      },
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
