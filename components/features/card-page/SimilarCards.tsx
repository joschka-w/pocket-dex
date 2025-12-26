'use client';

import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import Link from 'next/link';

import { Tables } from '@/types/database';
import { getCardUrl } from '@/lib/utils/card-slug-utils';

import CardImage from '@/components/common/card/components/CardImage';
import SimilarCardsPrevNextBtns from './SimilarCardsPrevNextBtns';

interface Props {
  cards: Tables<'card'>[];
}

function SimilarCards({ cards }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: true,
    watchDrag: emblaApi => isScrollable(emblaApi), // Disable drag when all slides fit on one page
  });

  function isScrollable(emblaApi: UseEmblaCarouselType[1]) {
    if (!emblaApi) return false;

    return emblaApi.internalEngine().scrollSnaps.length > 1;
  }

  return (
    <section className="col-span-2 mt-15">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Similar Cards</h2>
        {isScrollable(emblaApi) && <SimilarCardsPrevNextBtns emblaApi={emblaApi} />}
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <ol className="mt-7 flex gap-(--slide-gap)">
          {cards.map(card => (
            <li
              className="flex-[calc(var(--slide-size)-var(--gap-per-slide))] shrink-0 grow-0"
              key={`similar-card-${card.id}`}
            >
              <Link href={getCardUrl(card)}>
                <CardImage card={card} />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default SimilarCards;
