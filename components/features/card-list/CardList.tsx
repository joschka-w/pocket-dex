'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import useCardsQuery from '@/lib/hooks/useCardsQuery';

import Card from '@/components/common/card/Card';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import LoadingPopup from './LoadingPopup';

function CardList() {
  const { data, error, fetchNextPage, isFetchingNextPage, isLoading, isUpdating } = useCardsQuery();

  if (error) {
    console.error('An error has occured:', error);
    return <div>An error has occured: {error.message}</div>;
  }

  return (
    <ol className={cn('relative grid grid-cols-5 gap-4')}>
      <InfiniteScroll
        loadMore={fetchNextPage}
        isLoadingInitial={isLoading}
        isLoadingMore={isFetchingNextPage}
        rootMargin={400}
        className="col-span-5 py-3"
      >
        {data?.map(card => {
          return (
            <Link href={'#'} key={card.id!}>
              <Card card={card} />
            </Link>
          );
        })}
      </InfiniteScroll>

      {isUpdating && (
        <div className="absolute inset-0 bg-black/30 z-20 flex justify-center">
          <LoadingPopup className="fixed mt-20" />
        </div>
      )}
    </ol>
  );
}

export default CardList;
