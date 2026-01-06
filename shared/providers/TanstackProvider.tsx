'use client';

import { getQueryClient } from '@/shared/utils/getQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

function TanstackProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default TanstackProvider;
