import Image from 'next/image';
import { notFound } from 'next/navigation';

import { fetchCard } from '@/lib/data/fetchCard';
import { getCardIdFromSlug } from '@/lib/utils/card-slug-utils';
import { fetchSimilarCards } from '@/lib/data/fetchSimilarCards';

import PokemonCardInfo from '@/components/features/card-page/PokemonCardInfo';
import SimilarCards from '@/components/features/card-page/SimilarCards';
import TrainerCardInfo from '@/components/features/card-page/TrainerCardInfo';

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
  const { data: similarCards } = await fetchSimilarCards(card);

  if (error) {
    // TODO - Add error handling
    console.error('Error while fetching card: ', error);
    throw new Error(error.message);
  }

  return (
    <main className="max-w-mw mt-15 grid w-full grid-cols-[auto_1fr] grid-rows-1 gap-x-15">
      <div className="flex flex-col justify-between gap-4">
        <div className="max-w-96">
          <Image
            src={card.image_path}
            width={600}
            height={825}
            alt={`${card.name} Cover art`}
            placeholder="blur"
            blurDataURL={card.image_placeholder!}
          />
        </div>

        {/* // TODO - Implement this */}
        <button className="bg-bg-2 inset-ring-bg-3 rounded-xl px-4 py-3 inset-ring-1">
          Find Decks with this Card
        </button>
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
