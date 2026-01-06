'use client';

import DeckBuilderItem from './DeckBuilderItem';
import EmptyDeckPlaceholder from './EmptyDeckPlaceholder';
import ClearDeckButton from './ClearDeckButton';
import { MAX_DECK_SIZE, MAX_SAME_CARD_QUANTITY } from '../constants/deck-builder';
import { useDeck } from '../hooks/useDeckBuilder';

function DeckBuilder() {
  const { deck, deckSize, resetDeck } = useDeck();

  return (
    <div className="flex w-full flex-col gap-4">
      <header className="flex w-full items-center gap-3">
        <h3 className="font-semibold">Current Deck {`(${deckSize}/${MAX_DECK_SIZE})`}</h3>
        <span className="text-text-muted text-sm font-medium">{`max ${MAX_SAME_CARD_QUANTITY} copies per card`}</span>

        <ClearDeckButton clearDeck={resetDeck} />
      </header>

      <ol className="grid w-full grid-cols-[repeat(5,6rem)] gap-3">
        {deckSize <= 0 && <EmptyDeckPlaceholder />}

        {Array.from(deck.values()).map(card => (
          <DeckBuilderItem card={card} key={`deck-builder-${card.id}`} />
        ))}
      </ol>
    </div>
  );
}

export default DeckBuilder;
