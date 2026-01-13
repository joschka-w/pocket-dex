'use client';

import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

import { CardWithQuantity } from '@/features/deck-management/deck-builder/atoms/deckBuilder';
import { cn } from '@/shared/utils/cn';
import { useDeck } from '../hooks/useDeckBuilder';
import { getCardImageUrl } from '@/features/cards/utils/get-card-image-url';

interface Props {
  card: CardWithQuantity;
}

function DeckBuilderItem({ card }: Props) {
  const { addCard, removeCard, canCardBeAdded } = useDeck();

  const canBeAdded = canCardBeAdded(card.id);

  const handleAddCard = () => addCard(card);
  const handleRemoveCard = () => removeCard(card.id);

  return (
    <div className={cn('bg-bg-2 flex w-24 flex-col gap-2 rounded-lg p-2')}>
      <div className="aspect-605/846 rounded-md">
        <Image src={getCardImageUrl(card.id, 'low')} width={605} height={846} alt={card.name} />
      </div>

      <h4 className="overflow-hidden leading-none font-medium text-nowrap text-ellipsis">
        {card.name}
      </h4>

      <div className="flex items-center justify-between rounded-md bg-white/4">
        <button
          onClick={handleRemoveCard}
          className="text-text-muted hover:text-text cursor-pointer p-1 transition-colors"
        >
          <Minus size={20} strokeWidth={2.5} />
        </button>
        <span className="text-sm font-semibold select-none">{card.quantity}</span>
        <button
          disabled={!canBeAdded}
          onClick={handleAddCard}
          className="disabled:text-text-muted/50 text-text-muted hover:text-text cursor-pointer p-1 transition-colors disabled:cursor-default"
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default DeckBuilderItem;
