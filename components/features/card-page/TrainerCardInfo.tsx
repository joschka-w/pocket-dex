import { TrainerCardResult } from '@/lib/data/fetchCard';
import Header from './Header';
import InfoBox from './InfoBox';
import PullRates from './info-boxes/PullRates';
import Expansion from './info-boxes/Expansion';
import Effect from './info-boxes/Effect';

interface Props {
  card: TrainerCardResult;
}

function TrainerCardInfo({ card }: Props) {
  return (
    <>
      <div>
        <Header card={card} />

        <dl className="gridrows mt-7 grid grid-cols-6 grid-rows-[repeat(4,auto)] gap-5">
          {card.trainer_card.trainer_card_type === 'Item (Fossil)' && (
            <>
              <InfoBox label="HP" className="col-span-3">
                {card.trainer_card.hp || 'N/A'}
              </InfoBox>
              <InfoBox label="Type" className="col-span-3">
                {card.card_type}
              </InfoBox>
            </>
          )}

          {card.trainer_card.trainer_card_type !== 'Item (Fossil)' && (
            <InfoBox label="Type" className="col-span-6">
              {card.card_type}
            </InfoBox>
          )}

          <PullRates card={card} />
          <Expansion card={card} />

          <Effect card={card} />
        </dl>
      </div>
    </>
  );
}

export default TrainerCardInfo;
