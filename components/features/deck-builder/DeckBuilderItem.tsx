'use client';

import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

import { CardWithQuantity } from '@/lib/atoms/deckBuilder';
import { cn } from '@/lib/utils/cn';
import { useDeck } from '@/lib/hooks/useDeck';

interface Props {
  card: CardWithQuantity;
}

function DeckBuilderItem({ card }: Props) {
  const { addCard, removeCard, canCardBeAdded } = useDeck();

  const canBeAdded = canCardBeAdded(card.id!);

  const handleAddCard = () => addCard(card);
  const handleRemoveCard = () => removeCard(card.id!);

  return (
    <div className={cn('w-24 flex flex-col gap-2 rounded-lg bg-bg-2 p-2')}>
      <div className="aspect-605/846 rounded-md">
        <Image src={card.image_path!} width={605} height={846} alt={card.name!} />
      </div>

      <h4 className="font-medium leading-none text-nowrap text-ellipsis overflow-hidden">
        {card.name}
      </h4>

      <div className="flex items-center justify-between rounded-md bg-white/4">
        <button
          onClick={handleRemoveCard}
          className="cursor-pointer p-1 text-text-muted hover:text-text transition-colors"
        >
          <Minus size={20} strokeWidth={2.5} />
        </button>
        <span className="text-sm font-semibold select-none">{card.quantity}</span>
        <button
          disabled={!canBeAdded}
          onClick={handleAddCard}
          className="cursor-pointer disabled:text-text-muted/50 disabled:cursor-default p-1 text-text-muted hover:text-text transition-colors"
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default DeckBuilderItem;
