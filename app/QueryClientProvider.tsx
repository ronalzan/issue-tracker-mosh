'use client' //we use this directive because the QueryClientProvider uses React Context and it is only available in client component

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react';

//this query client has cache to store data that we get from the backend (API)
const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
        { children }
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider