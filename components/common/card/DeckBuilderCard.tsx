'use client';

import { Tables } from '@/types/database';
import { useDeck } from '@/lib/hooks/useDeck';

import CardRoot from './components/CardRoot';
import CardImage from './components/CardImage';
import CardInfo from './components/CardInfo';
import CardDeckBuilderOverlay from './components/CardDeckBuilderOverlay';

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
