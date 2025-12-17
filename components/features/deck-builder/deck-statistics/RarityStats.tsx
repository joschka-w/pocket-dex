import { raritySVGs } from '@/lib/constants/asset-maps';
import { RarityGroup, RarityStats as TRarityStats } from '@/lib/utils/calculate-deck-stats';
import Image from 'next/image';
import { Enums } from '@/types/database';
import StatsWrapper from './StatsWrapper';

const RARITY_GROUP_TO_SVG_NAME: Record<RarityGroup, Exclude<Enums<'rarity'>, 'promo'>> = {
  diamond: 'diamond_1',
  star: 'star_1',
  crown: 'crown',
};

interface Props {
  rarityStats: TRarityStats;
}

function RarityStats({ rarityStats }: Props) {
  // Sorting by quantity and taking only the first 4 elements
  const statsEntries = Array.from(rarityStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  return (
    <StatsWrapper title="Rarities Used">
      {statsEntries.length === 0 && <span className="text-text-muted text-2xl mb-2">N/A</span>}

      <ol className="flex">
        {statsEntries.map(([rarityGroup, quantity]) => {
          const svgKey = RARITY_GROUP_TO_SVG_NAME[rarityGroup];

          return (
            <li key={`color-stats-${rarityGroup}`} className="list-none flex flex-col items-center">
              <div className="aspect-square w-10 flex items-end justify-center">
                <Image
                  src={raritySVGs[svgKey]}
                  alt={`${rarityGroup} rarities`}
                  className="max-h-full py-1 w-full"
                />
              </div>
              <span className="text-text-muted font-semibold">{quantity}</span>
            </li>
          );
        })}
      </ol>
    </StatsWrapper>
  );
}

export default RarityStats;
