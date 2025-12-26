import { Tables } from '@/types/database';
import CardImage from './components/CardImage';
import CardRoot from './components/CardRoot';
import CardInfo from './components/CardInfo';
import Link from 'next/link';
import { getCardUrl } from '@/lib/utils/card-slug-utils';

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
