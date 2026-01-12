import Image from 'next/image';
import { notFound } from 'next/navigation';

import { fetchCard } from '@/features/card-detail/api/fetchCard';
import { getCardIdFromSlug } from '@/shared/utils/card-slug-utils';
import { fetchSimilarCards } from '@/features/card-detail/api/fetchSimilarCards';
import { getCardImageUrl } from '@/shared/utils/get-card-image-url';

import PokemonCardInfo from '@/features/card-detail/components/PokemonCardInfo';
import TrainerCardInfo from '@/features/card-detail/components/TrainerCardInfo';
import SimilarCards from '@/features/card-detail/components/SimilarCards';
import Error from '@/shared/components/Error';

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

async function CardPage({ params }: Props) {
  const slug = (await params).slug;
  const cardId = getCardIdFromSlug(slug);

  if (!cardId) notFound();

  const { data: card, error } = await fetchCard(cardId);
  const { data: similarCards = null } = await fetchSimilarCards(card);

  if (error) {
    return <Error message={`Error while fetching card: ${error.message}`} />;
  }

  return (
    <main className="max-w-mw mt-15 grid w-full grid-cols-[auto_1fr] grid-rows-1 gap-x-15">
      <div className="flex flex-col justify-between gap-4">
        <div className="max-w-96">
          <Image
            src={getCardImageUrl(cardId, 'high')}
            width={600}
            height={825}
            alt={`${card.name} Cover art`}
            loading="lazy"
            placeholder="blur"
            blurDataURL={card.image_placeholder!}
          />
        </div>

        {/* // TODO - Implement this */}
        {/* <button className="bg-bg-2 inset-ring-bg-3 rounded-xl px-4 py-3 inset-ring-1">
          Find Decks with this Card
        </button> */}
      </div>

      <div>
        {card.card_type === 'pokemon' && <PokemonCardInfo card={card} />}
        {card.card_type === 'trainer' && <TrainerCardInfo card={card} />}
      </div>

      {similarCards && similarCards.length >= 1 && <SimilarCards cards={similarCards} />}
    </main>
  );
}

export default CardPage;
