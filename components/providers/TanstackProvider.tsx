'use client';

import { getQueryClient } from '@/lib/utils/getQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

// pattern is copied from https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

function TanstackProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default TanstackProvider;
