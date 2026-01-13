import Image from 'next/image';

import { cn } from '@/shared/utils/cn';
import { DeckResult } from '../api/fetchDecks';
import { getCardImageUrl } from '@/features/cards/utils/get-card-image-url';

type CardInDeck = DeckResult['cards'][number]['card'];

interface Props {
  coverCard: CardInDeck;
}

function DeckBackdrop({ coverCard }: Props) {
  return (
    <div
      className={cn(
        'absolute inset-0 -bottom-2 z-0 overflow-hidden inset-shadow-[0_0_16px_0] inset-shadow-black/30',
        "before:to-bg-1 before:absolute before:inset-0 before:z-10 before:bg-linear-to-b before:from-transparent before:content-['']",
      )}
    >
      <Image
        className="h-full w-full object-cover object-[50%_30%] opacity-15 blur-xs"
        src={getCardImageUrl(coverCard.id, 'low')}
        placeholder="blur"
        blurDataURL={coverCard.image_placeholder}
        width={600}
        height={825}
        alt={coverCard.name}
      />
    </div>
  );
}

export default DeckBackdrop;
