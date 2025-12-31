import CardImage from '@/components/common/card/components/CardImage';
import CardRoot from '@/components/common/card/components/CardRoot';
import { DeckResult } from '@/lib/data/fetchDecks';

export type Cards = DeckResult['cards'];

interface Props {
  cards: Cards;
}

function DeckCardList({ cards }: Props) {
  return (
    <ol className="grid grid-cols-6 gap-2 px-4">
      {cards
        .sort((a, b) => b.quantity - a.quantity)
        .map(({ card, quantity }) => (
          <li key={card.id}>
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
