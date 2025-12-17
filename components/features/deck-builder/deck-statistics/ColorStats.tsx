import Image from 'next/image';
import { colorSVGs } from '@/lib/constants/asset-maps';
import { ColorStats as TColorStats } from '@/lib/utils/calculate-deck-stats';
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
      {statsEntries.length === 0 && <span className="text-text-muted text-2xl mb-2">N/A</span>}

      <ol className="flex justify-center gap-2 w-full">
        {statsEntries.map(([colorName, quantity]) => {
          return (
            <li
              key={`color-stats-${colorName}`}
              className="list-none flex flex-col items-center gap-1"
            >
              <div className="aspect-square w-7">
                <Image src={colorSVGs[colorName]} alt={`${colorName} energy`} />
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
