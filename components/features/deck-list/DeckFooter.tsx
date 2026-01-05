import Image from 'next/image';

import packPointsSymbol from '@/assets/pack_points_symbol.svg';
import { DeckResult } from '@/lib/data/fetchDecks';
import { calcDeckPrice } from '@/lib/utils/calculate-deck-stats';
import DeckLikeButton from './DeckLikeButton';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/utils/getQueryClient';
import { createClient } from '@/lib/utils/supabase/server';

interface Props {
  deck: DeckResult;
}

async function DeckFooter({ deck }: Props) {
  const queryClient = getQueryClient();
  const supabase = await createClient();

  const cards = deck.cards.map(({ card, quantity }) => ({ rarity: card.rarity, quantity }));
  const price = calcDeckPrice(cards);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // TODO - Add caching
  // Prefetching likes for better UX
  await queryClient.prefetchQuery({
    queryKey: ['user-likes', user?.id],
    queryFn: async () => {
      if (!user) return new Set();

      const { data, error } = await supabase
        .from('deck_likes')
        .select('deck_id')
        .eq('user_id', user.id);

      if (error) throw new Error(error.message);

      return new Set(data.map(d => d.deck_id));
    },
  });

  return (
    <div className="mt-2 flex justify-between p-4">
      <div className="text-text-muted flex items-center gap-2 text-sm font-semibold">
        <Image className="h-6 w-fit" src={packPointsSymbol} alt="Pack Points" />
        {price}
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <DeckLikeButton deck={deck} userId={user?.id} />
      </HydrationBoundary>
    </div>
  );
}

export default DeckFooter;
