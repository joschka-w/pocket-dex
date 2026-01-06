import CardRoot from '@/features/cards/components/card-parts/CardRoot';
import CardImage from '@/features/cards/components/card-parts/CardImage';
import { DeckResult } from '../api/fetchDecks';

export type Cards = DeckResult['cards'];

interface Props {
  cards: Cards;
}

function DeckCardList({ cards }: Props) {
  return (
    <ol className="mb-auto grid grid-cols-6 gap-2 px-4">
      {cards
        .sort((a, b) => b.quantity - a.quantity)
        .map(({ card, quantity }) => (
          <li key={card.id} className="h-fit">
            <CardRoot className="relative">
              <CardImage card={card} />
              {quantity > 1 && (
                <div className="absolute bottom-2 left-2 flex aspect-square w-5 items-center justify-center rounded-sm bg-black/80 text-sm font-semibold">
                  {quantity}
                </div>
              )}
            </CardRoot>
          </li>
        ))}
    </ol>
  );
}

export default DeckCardList;
