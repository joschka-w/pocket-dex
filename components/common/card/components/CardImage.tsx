import { cn } from '@/lib/utils/cn';
import { Tables } from '@/types/database';
import Image from 'next/image';

interface Props {
  card: Pick<Tables<'card_view_new'>, 'image_path' | 'name' | 'image_placeholder'>;
  hasHoverAnimation?: boolean;
}

function CardImage({ card, hasHoverAnimation = false }: Props) {
  return (
    <div className="aspect-600/825 @container relative">
      <Image
        className={cn(
          'select-none aspect-600/825 rounded-[3.5cqw]',
          hasHoverAnimation &&
            'hover:scale-104 hover:brightness-110 transition-[filter,scale] duration-250'
        )}
        src={card.image_path!}
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
