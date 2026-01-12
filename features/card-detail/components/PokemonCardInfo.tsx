import { PokemonCardResult } from '../types/fetch-card-types';

import InfoBox from './InfoBox';
import Header from './Header';
import PullRates from './info-boxes/PullRates';
import RetreatCost from './info-boxes/RetreatCost';
import Weakness from './info-boxes/Weakness';
import Expansion from './info-boxes/Expansion';
import Attacks from './info-boxes/Attacks';
import Ability from './info-boxes/Ability';
import { cn } from '@/shared/utils/cn';

interface Props {
  card: PokemonCardResult;
}

async function PokemonCardInfo({ card }: Props) {
  return (
    <>
      <div>
        <Header card={card} />

        <dl className="gridrows mt-7 grid grid-cols-6 grid-rows-[repeat(4,auto)] gap-5">
          <InfoBox label="Stage" className="col-span-2">
            {card.pokemon_card.stage}
          </InfoBox>
          <InfoBox label="HP" className="col-span-2">
            {card.pokemon_card.hp}
          </InfoBox>
          <InfoBox label="Type" className="col-span-2">
            {card.card_type}
          </InfoBox>

          <RetreatCost card={card} />
          <Weakness card={card} />

          {card.rarity !== 'promo' && <PullRates card={card} />}
          <Expansion card={card} className={cn(card.rarity === 'promo' && 'col-span-6')} />

          <Attacks card={card} />

          <Ability card={card} />
        </dl>
      </div>
    </>
  );
}

export default PokemonCardInfo;
