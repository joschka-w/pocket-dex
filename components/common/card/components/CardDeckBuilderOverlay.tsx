'use client';

import { ReactNode } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

import { useDeck } from '@/lib/hooks/useDeck';
import { cn } from '@/lib/utils/cn';
import { Tables } from '@/types/database';

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
      {!cardIsInDeck && (
        <button className="absolute hidden group-hover:flex cursor-pointer justify-center items-center bg-black/70 backdrop-blur-xs left-1/2 top-1/2 -translate-1/2 w-20 rounded-xl aspect-square z-20">
          <PlusIcon size={44} strokeWidth={3} className="text-primary" />
        </button>
      )}

      {cardIsInDeck && (
        <div className="absolute left-1/2 bottom-5 rounded-lg z-20 group-hover:flex hidden w-28 -outline-offset-2 outline-2 outline-bg-2 -translate-x-1/2 h-8 overflow-hidden">
          <button
            onClick={handleRemoveCard}
            className="text-danger bg-bg-1 flex-1 flex items-center justify-center cursor-pointer hover:bg-bg-2"
          >
            <MinusIcon strokeWidth={2.5} />
          </button>

          <button
            disabled={!canBeAdded}
            onClick={handleAddCard}
            className="text-confirmation not-disabled:hover:bg-bg-2 disabled:bg-neutral-800 bg-bg-1 flex-1 disabled:text-text-muted flex items-center justify-center disabled:cursor-default cursor-pointer"
          >
            <PlusIcon strokeWidth={2.5} />
          </button>
        </div>
      )}

      {children}
    </div>
  );
}

export default CardDeckBuilderOverlay;
