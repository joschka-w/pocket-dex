import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';

import { cardFilterLoadingAtom } from '../filtering/atoms/cardFilterLoadingAtom';
import { useInfiniteQuery } from '@tanstack/react-query';
import getFilterParamsFromUrl from '../filtering/utils/getFilterParamsFromUrl';
import fetchCards from '../api/fetchCards';
import { cardFilterParsers, cardFilterUrlKeys } from '../filtering/config/card-filter-config';

function useCardsQuery() {
  const [filterLoading, setFilterLoading] = useAtom(cardFilterLoadingAtom);

  const params = useSearchParams();
  const filterParams = getFilterParamsFromUrl(
    Object.fromEntries(params.entries()),
    cardFilterParsers,
    { urlKeys: cardFilterUrlKeys },
  ); // TODO - Fix unnecessary parsing to and from entries
  const filterParamsSerialized = JSON.stringify(filterParams);

  // TODO - Somehow get rid of this useEffect
  useEffect(() => {
    setFilterLoading(false);
  }, [filterParamsSerialized, setFilterLoading]);

  // TODO - Add error handling
  const { data, fetchNextPage, isLoading, isFetchingNextPage, error } = useInfiniteQuery({
    queryKey: ['cards', filterParams],
    queryFn: ({ pageParam }) => fetchCards(filterParams, pageParam),
    initialPageParam: 0,
    getNextPageParam(lastPage, allPages) {
      const nextPage = lastPage.length ? allPages.length : undefined;

      return nextPage;
    },
  });

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
