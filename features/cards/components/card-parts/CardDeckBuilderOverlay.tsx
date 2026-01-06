'use client';

import { ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';
import { Tables } from '@/types/database';

import AddCardBtnInitial from './AddCardBtnInitial';
import AddRemoveCardBtns from './AddRemoveCardBtns';
import { useDeck } from '@/features/deck-management/deck-builder/hooks/useDeckBuilder';

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
        'group relative overflow-hidden',
        cardIsInDeck &&
          "before:absolute before:inset-0 before:z-10 before:bg-linear-to-b before:from-transparent before:from-50% before:content-[''] group-hover:before:to-black/50",
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
