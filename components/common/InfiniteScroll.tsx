'use client';

import { ReactNode, useEffect, useRef } from 'react';

import Loader from './Loader';
import { cn } from '@/lib/utils/cn';

interface Props {
  children?: ReactNode;
  loadMore: () => void;
  isLoadingMore: boolean;
  isLoadingInitial: boolean;
  rootMargin?: number;
  className?: string;
}

function InfiniteScroll({
  loadMore,
  isLoadingMore,
  isLoadingInitial,
  rootMargin = 100,
  className,
  children,
}: Props) {
  const observerElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const isLoading = isLoadingMore || isLoadingInitial;

        if (entry.isIntersecting && !isLoading) loadMore();
      });
    };

    const observerElement = observerElementRef.current;
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: `${rootMargin}px`,
      threshold: 0,
    });

    if (observerElement) observer.observe(observerElement);

    return () => observer.disconnect();
  }, [isLoadingInitial, isLoadingMore, rootMargin, loadMore]);

  return (
    <>
      {children}

      <div ref={observerElementRef} className={cn('flex justify-center', className)}>
        {isLoadingMore && !isLoadingInitial && <Loader />}
      </div>
    </>
  );
}

export default InfiniteScroll;
