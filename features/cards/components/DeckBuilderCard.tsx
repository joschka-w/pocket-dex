'use client';

import { Tables } from '@/types/database';
import CardRoot from './card-parts/CardRoot';
import CardDeckBuilderOverlay from './card-parts/CardDeckBuilderOverlay';
import CardImage from './card-parts/CardImage';
import CardInfo from './card-parts/CardInfo';
import { useDeck } from '@/features/deck-management/deck-builder/hooks/useDeckBuilder';

interface Props {
  card: Tables<'card_view_new'>;
  isUpdating?: boolean;
}

function DeckBuilderCard({ card, isUpdating }: Props) {
  const { addCard, removeCard } = useDeck();

  const handleClick = () => addCard(card);

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    removeCard(card.id!);
  };

  return (
    <CardRoot
      onClick={handleClick}
      onContextMenu={handleRightClick}
      isUpdating={isUpdating}
      className="cursor-pointer"
    >
      <CardDeckBuilderOverlay card={card}>
        <CardImage card={card} />
      </CardDeckBuilderOverlay>
      <CardInfo card={card} />
    </CardRoot>
  );
}

export default DeckBuilderCard;
