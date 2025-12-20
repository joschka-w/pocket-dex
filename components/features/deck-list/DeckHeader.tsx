import Image from 'next/image';

import { colorSVGs } from '@/lib/constants/asset-maps';
import { DeckResult } from '@/lib/data/fetchDecks';
import { cn } from '@/lib/utils/cn';
import { formatToRelativeTime } from '@/lib/utils/formatToRelativeTime';

interface Props {
  deck: DeckResult;
}

type CardInDeck = DeckResult['cards'][number]['card'];

function DeckHeader({ deck }: Props) {
  const dateFormatted = formatToRelativeTime(new Date(deck.created_at));

  const coverCard = deck.cards[0].card;

  return (
    <div className="relative">
      <Backdrop coverCard={coverCard} />

      <div className="flex items-center justify-between p-4">
        <div className="z-10 flex flex-col gap-1">
          <h3 className="text-2xl font-semibold leading-none">{deck.title}</h3>
          <span className="text-sm text-text-muted">{dateFormatted}</span>
        </div>

        <ul className="z-10 row-span-2 flex gap-1">
          {deck.colors.map(color => (
            <li key={`deck-color-${deck.id}-${color}`}>
              <Image src={colorSVGs[color]} width={24} height={24} alt="Color" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Backdrop({ coverCard }: { coverCard: CardInDeck }) {
  return (
    <div
      className={cn(
        'inset-0 -bottom-2 absolute inset-shadow-[0_0_12px_0] inset-shadow-black z-0 overflow-hidden',
        "before:content-[''] before:absolute before:inset-0 before:bg-linear-to-b before:from-transparent before:to-bg-1 before:z-10"
      )}
    >
      <Image
        className="opacity-30 object-cover w-full h-full object-[50%_30%] blur-md"
        src={coverCard.image_path}
        placeholder="blur"
        blurDataURL={coverCard.image_placeholder}
        width={600}
        height={825}
        alt={coverCard.name}
      />
    </div>
  );
}

export default DeckHeader;
