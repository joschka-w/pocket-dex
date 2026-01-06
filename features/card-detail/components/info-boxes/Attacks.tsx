import { PokemonCardResult } from '@/features/card-detail/api/fetchCard';
import InfoBox from '../InfoBox';
import { getColorImg } from '@/shared/constants/asset-maps';
import Image from 'next/image';
import { formatCardText } from '@/shared/utils/format-card-text';
import Seperator from '@/shared/components/ui/Seperator';
import { Fragment } from 'react/jsx-runtime';

interface Props {
  card: PokemonCardResult;
}

function Attacks({ card }: Props) {
  return (
    <InfoBox label="Attacks" className="col-span-6">
      <ol className="flex flex-col gap-3">
        {card.pokemon_card.attack.map((attack, i, arr) => {
          const isLast = i === arr.length - 1;

          return (
            <Fragment key={`attack-${attack.id}`}>
              <Attack attack={attack} />
              {!isLast && <Seperator />}
            </Fragment>
          );
        })}
      </ol>
    </InfoBox>
  );
}

interface AttackProps {
  attack: PokemonCardResult['pokemon_card']['attack'][number];
}

function Attack({ attack }: AttackProps) {
  return (
    <li>
      <div className="flex items-center">
        <ol className="flex gap-1">
          {attack.energy_cost.map((color, i) => (
            <li key={`attack-color-${attack.id}-${color}-${i}`}>
              <Image src={getColorImg(color)} alt={color} className="aspect-square w-6" />
            </li>
          ))}
        </ol>

        <h5 className="ml-3 font-medium">{attack.name}</h5>

        {attack.damage && (
          <span className="text-text-muted ml-auto text-xl font-semibold">
            {attack.damage}
            {attack.damage_modifier}
          </span>
        )}
      </div>

      {attack.effect && (
        <p className="text-text-muted mt-1.5 max-w-[70ch] text-sm leading-relaxed font-normal normal-case">
          {formatCardText(attack.effect)}
        </p>
      )}
    </li>
  );
}

export default Attacks;
