'use client';

import { cn } from '@/shared/utils/cn';
import useCardsQuery from '@/features/card-catalog/hooks/useCardsQuery';

import InfiniteScroll from '@/shared/components/InfiniteScroll';
import LoadingPopup from './LoadingPopup';
import NoCardsFound from './NoCardsFound';
import DeckBuilderCard from '@/features/cards/components/DeckBuilderCard';
import Card from '@/features/cards/components/Card';

interface Props {
  className?: string;
  columns?: '5' | '4';
  isInDeckBuilder?: boolean;
}

function CardList({ columns = '5', isInDeckBuilder = false, className }: Props) {
  const { data, error, fetchNextPage, isFetchingNextPage, isLoading, isUpdating } = useCardsQuery();
  const hasCards = data && data.length > 0;

  if (error) {
    console.error('An error has occured:', error);
    throw error;
  }

  return (
    <ol
      className={cn(
        `relative grid gap-4 ${columns === '5' ? 'grid-cols-5' : 'grid-cols-4'}`,
        className,
      )}
    >
      <InfiniteScroll
        loadMore={fetchNextPage}
        isLoadingInitial={isLoading}
        isLoadingMore={isFetchingNextPage}
        rootMargin={400}
        className={`py-3 ${columns === '5' ? 'col-span-5' : 'col-span-4'}`}
      >
        {data?.map(card => (
          <li key={card.id} className="list-none">
            {isInDeckBuilder ? (
              <DeckBuilderCard card={card} isUpdating={isUpdating} />
            ) : (
              <Card card={card} isUpdating={isUpdating} />
            )}
          </li>
        ))}
      </InfiniteScroll>

      {!isLoading && !hasCards && (
        <NoCardsFound className={`${columns === '5' ? 'col-span-5' : 'col-span-4'} row-start-1`} />
      )}

      {isUpdating && (
        <div className="absolute inset-0 z-20 flex justify-center">
          <LoadingPopup className="fixed mt-20" />
        </div>
      )}
    </ol>
  );
}

export default CardList;
