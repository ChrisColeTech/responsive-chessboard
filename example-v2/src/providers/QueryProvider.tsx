// React Query provider configuration for server state management
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProviderProps } from '@/types/providers/provider.types';

// Configure QueryClient with optimized settings for chess application
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - chess data doesn't change frequently
      gcTime: 10 * 60 * 1000, // 10 minutes cache time
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (error && 'status' in error && error.status === 401) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false, // Don't refetch on window focus for demo
      refetchOnReconnect: true, // Do refetch when connection is restored
    },
    mutations: {
      retry: 1, // Retry mutations once on failure
      // Global error handling could be added here
    },
  },
});

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show devtools in development only */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false} 
          position="bottom"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
};

// Export the QueryClient instance for use in tests or advanced scenarios
export { queryClient };