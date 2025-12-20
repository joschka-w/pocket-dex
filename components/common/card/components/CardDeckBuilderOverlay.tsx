'use client';

import { ReactNode } from 'react';

import { useDeck } from '@/lib/hooks/useDeck';
import { cn } from '@/lib/utils/cn';
import { Tables } from '@/types/database';

import AddCardBtnInitial from './AddCardBtnInitial';
import AddRemoveCardBtns from './AddRemoveCardBtns';

interface Props {
  children?: ReactNode;
  card: Tables<'card_view_new'>;
}

function CardDeckBuilderOverlay({ card, children }: Props) {
  const { isCardInDeck, addCard, removeCard, canCardBeAdded } = useDeck();

  const cardIsInDeck = isCardInDeck(card.id!);
  const canBeAdded = canCardBeAdded(card.id!);

  const handleAddCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addCard(card);
  };

  const handleRemoveCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeCard(card.id!);
  };

  return (
    <div
      className={cn(
        'relative group overflow-hidden',
        cardIsInDeck &&
          "before:content-[''] before:from-50% before:absolute before:inset-0 before:bg-linear-to-b before:from-transparent group-hover:before:to-black/50 before:z-10"
      )}
    >
      {!cardIsInDeck && <AddCardBtnInitial />}

      {cardIsInDeck && (
        <AddRemoveCardBtns
          onAddClick={handleAddCard}
          onRemoveClick={handleRemoveCard}
          disableAddCard={!canBeAdded}
        />
      )}

      {children}
    </div>
  );
}

export default CardDeckBuilderOverlay;
