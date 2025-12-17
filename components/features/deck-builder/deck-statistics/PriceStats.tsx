import Image from 'next/image';
import packPointSymbol from '@/assets/pack_points_symbol.svg';
import StatsWrapper from './StatsWrapper';

interface Props {
  price: number;
}

function PriceStats({ price }: Props) {
  return (
    <StatsWrapper title="Deck Price">
      <div className="flex flex-col items-center gap-2">
        <div className="w-7 aspect-square flex items-center mr-1.5 justify-center">
          <Image src={packPointSymbol} alt="Pack Points" className="max-h-[108%] w-full" />
        </div>
        <span className="text-text-muted font-semibold">{price}</span>
      </div>
    </StatsWrapper>
  );
}

export default PriceStats;
