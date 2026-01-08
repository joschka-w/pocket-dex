import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';

import fetchCards from '../api/fetchCards';
import { useInfiniteQuery } from '@tanstack/react-query';
import getFilterParamsFromUrl from '../filtering/utils/getFilterParamsFromUrl';
import { cardFilterParsers, cardFilterUrlKeys } from '../filtering/config/card-filter-config';
import { cardFilterLoadingAtom } from '../filtering/atoms/cardFilterLoadingAtom';

function useCardsQuery() {
  const [filterLoading, setFilterLoading] = useAtom(cardFilterLoadingAtom);
  const params = useSearchParams();

  const filterParams = getFilterParamsFromUrl(
    Object.fromEntries(params.entries()),
    cardFilterParsers,
    { urlKeys: cardFilterUrlKeys },
  ); // TODO - Fix unnecessary parsing to and from entries

  const { data, fetchNextPage, isLoading, isFetchingNextPage, error } = useInfiniteQuery({
    queryKey: ['cards', filterParams],
    queryFn: ({ pageParam }) => fetchCards(filterParams, pageParam),
    initialPageParam: 0,
    retry: 1,
    getNextPageParam(lastPage, allPages) {
      const nextPage = lastPage.length ? allPages.length : undefined;

      return nextPage;
    },
  });

  // TODO - Somehow get rid of this useEffect
  useEffect(() => {
    // Loading is finished once data changes (works because it checks for
    // referential equality, so even when data is the same this effect triggers)
    setFilterLoading(false);
  }, [data, setFilterLoading]);

  const isUpdating = filterLoading || isLoading;
  const allData = data?.pages.flat() || null;

  return {
    data: allData,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    isUpdating,
  };
}

export default useCardsQuery;
