import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';

import { filterLoadingAtom } from '../filtering/atoms/filterLoadingAtom';
import { useInfiniteQuery } from '@tanstack/react-query';
import getFilterParamsFromUrl from '../filtering/utils/getFilterParamsFromUrl';
import fetchCards from '../api/fetchCards';

function useCardsQuery() {
  const [filterLoading, setFilterLoading] = useAtom(filterLoadingAtom);

  const params = useSearchParams();
  const filterParams = getFilterParamsFromUrl(Object.fromEntries(params.entries())); // TODO - Fix unnecessary parsing to and from entries
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
