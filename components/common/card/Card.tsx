import { Tables } from '@/types/database';
import CardImage from './components/CardImage';
import CardRoot from './components/CardRoot';
import CardInfo from './components/CardInfo';
import Link from 'next/link';

interface Props {
  card: Tables<'card_view_new'>;
  isUpdating?: boolean;
}

function Card({ card, isUpdating = false }: Props) {
  return (
    <Link href={'#'}>
      <CardRoot isUpdating={isUpdating}>
        <CardImage card={card} hasHoverAnimation />
        <CardInfo card={card} />
      </CardRoot>
    </Link>
  );
}

export default Card;
