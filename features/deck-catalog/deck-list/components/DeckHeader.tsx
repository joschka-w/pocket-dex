import Image from 'next/image';

import { COLOR_SVG_MAP } from '@/shared/constants/asset-maps';
import { toRelativeTime } from '@/shared/utils/format-to-relative-time';
import DeckBackdrop from './DeckBackdrop';
import { getDeckCoverCard } from '../utils/getCoverCard';
import { DeckResult } from '../api/fetchDecks';

interface Props {
  deck: DeckResult;
}

function DeckHeader({ deck }: Props) {
  const dateFormatted = toRelativeTime(new Date(deck.created_at));

  const coverCard = getDeckCoverCard(deck);

  return (
    <div className="relative">
      <DeckBackdrop coverCard={coverCard} />

      <div className="flex items-center justify-between p-4">
        <div className="z-10 flex flex-col gap-1">
          <h3 className="text-2xl leading-none font-semibold">{deck.title}</h3>
          <span className="text-text-muted text-sm">{`by ${deck.author.username} • ${dateFormatted}`}</span>
        </div>

        <ul className="z-10 row-span-2 flex gap-1">
          {deck.colors.map(color => (
            <li key={`deck-color-${deck.id}-${color}`}>
              <Image src={COLOR_SVG_MAP[color]} width={24} height={24} alt="Color" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DeckHeader;
