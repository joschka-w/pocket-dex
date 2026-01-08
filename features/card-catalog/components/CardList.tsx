'use client';

import { cn } from '@/shared/utils/cn';
import useCardsQuery from '@/features/card-catalog/hooks/useCardsQuery';

import InfiniteScroll from '@/shared/components/InfiniteScroll';
import LoadingPopup from './LoadingPopup';
import NoCardsFound from './NoCardsFound';
import DeckBuilderCard from '@/features/cards/components/DeckBuilderCard';
import Card from '@/features/cards/components/Card';
import ScrollBackToTop from '@/shared/components/ScrollBackToTop';
import { useState } from 'react';
import Error from '@/shared/components/Error';

interface Props {
  className?: string;
  columns?: '5' | '4';
  isInDeckBuilder?: boolean;
}

function CardList({ columns = '5', isInDeckBuilder = false, className }: Props) {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const { data, error, fetchNextPage, isFetchingNextPage, isLoading, isUpdating } = useCardsQuery();
  const hasCards = data && data.length > 0;

  const observerRef = (node: HTMLLIElement | null) => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowScrollBtn(!entry.isIntersecting),
      { rootMargin: '500px' },
    );

    if (node) observer.observe(node);

    return () => {
      observer.disconnect();
    };
  };

  if (error) {
    return <Error message={`Error while fetching cards: ${error.message}`} />;
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
        {data?.map((card, i) => (
          <li key={card.id} className="list-none" ref={i === 0 ? observerRef : undefined}>
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

      <ScrollBackToTop show={showScrollBtn} />
    </ol>
  );
}

export default CardList;
