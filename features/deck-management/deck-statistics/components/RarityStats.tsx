import { RARITY_SVG_MAP } from '@/shared/constants/asset-maps';
import Image from 'next/image';
import { Enums } from '@/types/database';
import StatsWrapper from './StatsWrapper';
import { RarityGroup, RarityStats as TRarityStats } from '../utils/calculate-deck-stats';

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
      {statsEntries.length === 0 && <span className="text-text-muted mb-2 text-2xl">N/A</span>}

      <ol className="flex">
        {statsEntries.map(([rarityGroup, quantity]) => {
          const svgKey = RARITY_GROUP_TO_SVG_NAME[rarityGroup];

          return (
            <li key={`color-stats-${rarityGroup}`} className="flex list-none flex-col items-center">
              <div className="flex aspect-square w-10 items-end justify-center">
                <Image
                  src={RARITY_SVG_MAP[svgKey]}
                  alt={`${rarityGroup} rarities`}
                  className="max-h-full w-full py-1"
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
