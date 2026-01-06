import { PokemonCardResult } from '@/features/card-detail/api/fetchCard';
import Image from 'next/image';
import { getColorImg } from '@/shared/constants/asset-maps';
import InfoBox from '../InfoBox';

interface Props {
  card: PokemonCardResult;
}

function Weakness({ card }: Props) {
  return (
    <InfoBox label="Weakness" className="col-span-3">
      {card.pokemon_card.weakness ? (
        <div className="flex items-center gap-2 text-lg font-medium">
          <Image
            className="aspect-square w-7"
            src={getColorImg(card.pokemon_card.weakness)}
            alt="colorless energy"
          />
          +20
        </div>
      ) : (
        'N/A'
      )}
    </InfoBox>
  );
}

export default Weakness;
