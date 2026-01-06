import Image from 'next/image';
import { HydrationBoundary } from '@tanstack/react-query';

import packPointsSymbol from '@/assets/pack_points_symbol.svg';
import { createClient } from '@/shared/utils/supabase/server';
import { DeckResult } from '../../api/fetchDecks';
import { calcDeckPrice } from '../../deck-statistics/utils/calculate-deck-stats';

import DeckLikeButton from './DeckLikeButton';
import { prefetchUserLikes } from '../utils/prefetchUserLikes';

interface Props {
  deck: DeckResult;
}

async function DeckFooter({ deck }: Props) {
  const supabase = await createClient();

  const cards = deck.cards.map(({ card, quantity }) => ({ rarity: card.rarity, quantity }));
  const price = calcDeckPrice(cards);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const dehydratedState = await prefetchUserLikes(user?.id);

  return (
    <div className="mt-2 flex justify-between p-4">
      <div className="text-text-muted flex items-center gap-2 text-sm font-semibold">
        <Image className="h-6 w-fit" src={packPointsSymbol} alt="Pack Points" />
        {price}
      </div>

      <HydrationBoundary state={dehydratedState}>
        <DeckLikeButton deck={deck} userId={user?.id} />
      </HydrationBoundary>
    </div>
  );
}

export default DeckFooter;
