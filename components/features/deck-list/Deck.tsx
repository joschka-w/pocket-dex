import { DeckResult } from '@/lib/data/fetchDecks';
import DeckHeader from './DeckHeader';
import DeckCardList from './DeckCardList';
import DeckFooter from './DeckFooter';

interface Props {
  deck: DeckResult;
}

function Deck({ deck }: Props) {
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-xl border border-bg-2 bg-bg-1">
      <DeckHeader deck={deck} />

      <DeckCardList cards={deck.cards} />

      <DeckFooter deck={deck} />
    </div>
  );
}

export default Deck;
