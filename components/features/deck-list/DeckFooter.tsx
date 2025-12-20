import { HeartIcon } from 'lucide-react';
import Image from 'next/image';

import packPointsSymbol from '@/assets/pack_points_symbol.svg';
import { DeckResult } from '@/lib/data/fetchDecks';
import { calcDeckPrice } from '@/lib/utils/calculate-deck-stats';

interface Props {
  deck: DeckResult;
}

function DeckFooter({ deck }: Props) {
  const cards = deck.cards.map(({ card, quantity }) => ({ rarity: card.rarity, quantity }));

  const price = calcDeckPrice(cards);

  return (
    <div className="mt-2 flex justify-between p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-text-muted">
        <Image className="h-6 w-fit" src={packPointsSymbol} alt="Pack Points" />
        {price}
      </div>

      <button>
        {/* // TODO - Replace with actual like button */}
        <HeartIcon />
      </button>
    </div>
  );
}

export default DeckFooter;
