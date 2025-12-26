'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, useCallback, useEffect, useState } from 'react';
import { UseEmblaCarouselType } from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Props {
  emblaApi: UseEmblaCarouselType[1];
}

function SimilarCardsPrevNextBtns({ emblaApi }: Props) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSlideChange = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollNext(emblaApi?.canScrollNext());
    setCanScrollPrev(emblaApi?.canScrollPrev());
  }, [emblaApi]);

  useEffect(() => {
    emblaApi?.on('select', onSlideChange);

    return () => {
      emblaApi?.off('select', onSlideChange);
    };
  }, [emblaApi, onSlideChange]);

  function scrollPrev() {
    if (emblaApi) emblaApi.scrollPrev();
  }

  function scrollNext() {
    if (emblaApi) emblaApi.scrollNext();
  }

  return (
    <div className="flex gap-2">
      <Button disabled={!canScrollPrev} onClick={scrollPrev}>
        <ChevronLeftIcon />
      </Button>

      <Button disabled={!canScrollNext} onClick={scrollNext}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
}

function Button({
  className,
  children,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'bg-bg-2 not-disabled:hover:bg-bg-3 active:text-text-muted disabled:text-text-muted disabled:bg-bg-2/80 cursor-pointer rounded-xl p-2 transition-colors duration-100 disabled:cursor-default',
        className,
      )}
    >
      {children}
    </button>
  );
}

export default SimilarCardsPrevNextBtns;
