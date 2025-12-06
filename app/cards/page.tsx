import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import fetchCards from '@/lib/data-fetching/fetchCards';
import { getQueryClient } from '@/lib/utils/getQueryClient';
import getFilterParamsFromUrl from '@/lib/utils/getFilterParamsFromUrl';

import CardList from '@/components/features/card-list/CardList';
import FilterSidebar from '@/components/features/filter-sidebar/FilterSidebar';
import Searchbar from '@/components/features/search-bar/Searchbar';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CardsPage({ searchParams }: Props) {
  const queryClient = getQueryClient();
  const filterParams = getFilterParamsFromUrl(await searchParams);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cards', filterParams],
    queryFn: ({ pageParam }) => fetchCards(filterParams, pageParam),
    initialPageParam: 0,
  });

  return (
    // TODO - Calculate these heights and positions based on variables, not just hard coded
    <main className="w-full max-w-mw grid grid-cols-[1fr_3fr] grid-rows-[3rem_1fr] gap-7">
      <Suspense>
        <Searchbar className="col-start-2 sticky top-16 h-fit py-4 z-10" />
      </Suspense>

      <FilterSidebar className="row-start-2 sticky top-34 h-[calc(100vh-10rem)]" />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CardList />
      </HydrationBoundary>
    </main>
  );
}

export default CardsPage;
