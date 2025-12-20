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
      {cards.map(({ card, quantity }) => (
        <li key={card.id}>
          <CardRoot className="relative">
            <CardImage card={card} />
            <div className="absolute bottom-2 left-2 w-5 aspect-square bg-black/80 flex justify-center items-center rounded-sm font-semibold text-sm">
              {quantity}
            </div>
          </CardRoot>
        </li>
      ))}
    </ol>
  );
}

export default DeckCardList;
