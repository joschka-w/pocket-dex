import { PokemonCardResult } from '@/features/card-detail/api/fetchCard';
import { formatCardText } from '@/shared/utils/format-card-text';

import InfoBox from '../InfoBox';

interface Props {
  card: PokemonCardResult;
}

function Ability({ card }: Props) {
  if (!card.pokemon_card.ability_name || !card.pokemon_card.ability_effect) return null;

  return (
    <InfoBox label="Ability" className="col-span-6">
      <h5 className="font-medium">{card.pokemon_card.ability_name}</h5>
      <p className="text-text-muted mt-1 max-w-[70ch] text-sm leading-relaxed font-normal normal-case">
        {formatCardText(card.pokemon_card.ability_effect)}
      </p>
    </InfoBox>
  );
}

export default Ability;
