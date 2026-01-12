import { Tables } from '@/types/database';
import Link from 'next/link';
import { getCardUrl } from '@/shared/utils/card-slug-utils';
import CardRoot from './card-parts/CardRoot';
import CardImage from './card-parts/CardImage';
import CardInfo from './card-parts/CardInfo';

interface Props {
  card: Pick<Tables<'card_view'>, 'name' | 'id' | 'image_placeholder'>;
  isUpdating?: boolean;
  quality: 'high' | 'low';
}

function Card({ card, quality, isUpdating = false }: Props) {
  return (
    <Link href={getCardUrl(card)}>
      <CardRoot isUpdating={isUpdating}>
        <CardImage card={card} hasHoverAnimation quality={quality} />
        <CardInfo card={card} />
      </CardRoot>
    </Link>
  );
}

export default Card;
