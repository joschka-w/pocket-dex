import Image from 'next/image';

import { COLOR_SVG_MAP } from '@/shared/constants/asset-maps';
import { ColorStats as TColorStats } from '../utils/calculate-deck-stats';
import StatsWrapper from './StatsWrapper';

interface Props {
  colorStats: TColorStats;
}

function ColorStats({ colorStats }: Props) {
  // Sorting by quantity and taking only the first 4 elements
  const statsEntries = Array.from(colorStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  return (
    <StatsWrapper title="Energies Used">
      {statsEntries.length === 0 && <span className="text-text-muted mb-2 text-2xl">N/A</span>}

      <ol className="flex w-full justify-center gap-2">
        {statsEntries.map(([colorName, quantity]) => {
          return (
            <li
              key={`color-stats-${colorName}`}
              className="flex list-none flex-col items-center gap-1"
            >
              <div className="aspect-square w-7">
                <Image src={COLOR_SVG_MAP[colorName]} alt={`${colorName} energy`} />
              </div>
              <span className="text-text-muted font-semibold">{quantity}</span>
            </li>
          );
        })}
      </ol>
    </StatsWrapper>
  );
}

export default ColorStats;
