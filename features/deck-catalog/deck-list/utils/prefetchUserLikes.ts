import { cache } from 'react';
import { dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/getQueryClient';
import { fetchUserLikes } from '../api/fetchUserLikes';

// 'cache' prevents multiple fetches per request, it doesn't cache across
// different requests (which wouldn't work, as the data depends on the user)
export const prefetchUserLikes = cache(async (userId?: string) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user-likes', userId],
    queryFn: async () => fetchUserLikes(userId),
  });

  return dehydrate(queryClient);
});
