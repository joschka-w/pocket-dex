import { cn } from '@/shared/utils/cn';
import { getCardImageUrl } from '@/shared/utils/get-card-image-url';
import { Tables } from '@/types/database';
import Image from 'next/image';

interface Props {
  card: Pick<Tables<'card_view'>, 'id' | 'name' | 'image_placeholder'>;
  hasHoverAnimation?: boolean;
  quality?: 'high' | 'low';
}

function CardImage({ card, quality = 'low', hasHoverAnimation = false }: Props) {
  return (
    <div className="@container relative aspect-600/825">
      <Image
        className={cn(
          'aspect-600/825 rounded-[3.5cqw] select-none',
          hasHoverAnimation &&
            'transition-[filter,scale] duration-250 hover:scale-104 hover:brightness-110',
        )}
        src={getCardImageUrl(card.id, quality)}
        width={600}
        height={825}
        alt={`${card.name} Cover art`}
        placeholder="blur"
        blurDataURL={card.image_placeholder!}
      />
    </div>
  );
}

export default CardImage;
