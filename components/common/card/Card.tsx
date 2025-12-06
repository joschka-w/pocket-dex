import Image from 'next/image';
import { Tables } from '@/types/database';

interface Props {
  card: Tables<'card_view_new'>;
  className?: string;
}

function Card({ card, className }: Props) {
  return (
    <div className={className}>
      <div className="aspect-600/825 @container relative">
        <Image
          className="select-none aspect-600/825 hover:scale-104 rounded-[3.5cqw] hover:brightness-110 transition-[filter,scale] duration-250"
          src={card.image_path!}
          width={600}
          height={825}
          alt={`${card.name} Cover art`}
        />
      </div>

      <h4 className="mt-2 font-semibold">{card.name}</h4>
      <div className="mt-0.5 text-text-muted font-bold text-sm">{card.id}</div>
    </div>
  );
}

export default Card;
