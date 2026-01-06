import Image from 'next/image';
import { PokemonCardResult } from '@/features/card-detail/api/fetchCard';
import { getColorImg } from '@/shared/constants/asset-maps';
import InfoBox from '../InfoBox';

interface Props {
  card: PokemonCardResult;
}

function RetreatCost({ card }: Props) {
  return (
    <InfoBox label="Retreat Cost" className="col-span-3">
      <div className="flex gap-2">
        {Array.from({ length: card.pokemon_card.retreat_cost })
          .fill(0)
          .map((_, i) => (
            <Image
              className="aspect-square w-7"
              src={getColorImg('colorless')}
              alt="colorless energy"
              key={`retreat-cost-${i}`}
            />
          ))}
      </div>
    </InfoBox>
  );
}

export default RetreatCost;
