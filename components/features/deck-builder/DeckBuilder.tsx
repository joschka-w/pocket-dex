'use client';

import { useDeck } from '@/lib/hooks/useDeck';
import { MAX_DECK_SIZE, MAX_SAME_CARD_QUANTITY } from '@/lib/constants/deck-builder';

import DeckBuilderItem from './DeckBuilderItem';
import EmptyDeckPlaceholder from './EmptyDeckPlaceholder';
import ClearDeckButton from './ClearDeckButton';

function DeckBuilder() {
  const { deck, deckSize, resetDeck } = useDeck();

  return (
    <div className="flex w-full flex-col gap-4 ">
      <header className="flex items-center gap-3 w-full">
        <h3 className="font-semibold">Current Deck {`(${deckSize}/${MAX_DECK_SIZE})`}</h3>
        <span className="text-sm font-medium text-text-muted">{`max ${MAX_SAME_CARD_QUANTITY} copies per card`}</span>

        <ClearDeckButton clearDeck={resetDeck} />
      </header>

      <ol className="grid grid-cols-[repeat(5,6rem)] gap-3 w-full">
        {deckSize <= 0 && <EmptyDeckPlaceholder />}

        {Array.from(deck.values()).map(card => (
          <DeckBuilderItem card={card} key={`deck-builder-${card.id}`} />
        ))}
      </ol>
    </div>
  );
}

export default DeckBuilder;
