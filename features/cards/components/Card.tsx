import { Tables } from '@/types/database';
import Link from 'next/link';
import { getCardUrl } from '@/shared/utils/card-slug-utils';
import CardRoot from './card-parts/CardRoot';
import CardImage from './card-parts/CardImage';
import CardInfo from './card-parts/CardInfo';

interface Props {
  card: Pick<Tables<'card_view_new'>, 'name' | 'id' | 'image_path' | 'image_placeholder'>;
  isUpdating?: boolean;
}

function Card({ card, isUpdating = false }: Props) {
  return (
    <Link href={getCardUrl(card)}>
      <CardRoot isUpdating={isUpdating}>
        <CardImage card={card} hasHoverAnimation />
        <CardInfo card={card} />
      </CardRoot>
    </Link>
  );
}

export default Card;
