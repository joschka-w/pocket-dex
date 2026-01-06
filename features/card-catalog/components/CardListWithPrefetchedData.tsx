import { ComponentPropsWithoutRef } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/utils/getQueryClient';
import getFilterParamsFromUrl from '@/features/card-catalog/filtering/utils/getFilterParamsFromUrl';
import CardList from './CardList';
import fetchCards from '@/features/card-catalog/api/fetchCards';
import { cardFilterParsers, cardFilterUrlKeys } from '../filtering/config/card-filter-config';

interface Props extends ComponentPropsWithoutRef<typeof CardList> {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CardListWithPrefetchedData({ searchParams, ...props }: Props) {
  const queryClient = getQueryClient();
  const filterParams = getFilterParamsFromUrl(await searchParams, cardFilterParsers, {
    urlKeys: cardFilterUrlKeys,
  });

  // Prefetching initial cards on server for better UX
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cards', filterParams],
    queryFn: ({ pageParam }) => fetchCards(filterParams, pageParam),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardList {...props} />
    </HydrationBoundary>
  );
}

export default CardListWithPrefetchedData;
