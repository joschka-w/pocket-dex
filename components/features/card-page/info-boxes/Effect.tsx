import { formatCardText } from '@/lib/utils/format-card-text';

import { TrainerCardResult } from '@/lib/data/fetchCard';
import InfoBox from '../InfoBox';

interface Props {
  card: TrainerCardResult;
}

function Effect({ card }: Props) {
  return (
    <InfoBox label="Effect" className="col-span-6">
      <p className="mt-1 max-w-[70ch] text-sm leading-relaxed font-normal normal-case">
        {formatCardText(card.trainer_card.effect)}
      </p>
    </InfoBox>
  );
}

export default Effect;
