import { formatCardText } from '@/shared/utils/format-card-text';

import InfoBox from '../InfoBox';
import { TrainerCardResult } from '../../types/fetch-card-types';

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
