import { toPercentage } from '@/shared/utils/format-to-percentage';

import { CardResult } from '@/features/card-detail/api/fetchCard';
import { calculatePullRates } from '../../utils/calculate-pull-rates';

import InfoBox from '../InfoBox';

interface Props {
  card: CardResult;
}

async function PullRates({ card }: Props) {
  const { data, error } = await calculatePullRates(card.rarity, card.packs[0].booster_pack.id);

  if (error || !data) return <div>ERROR: {error}</div>;

  return (
    <InfoBox
      label={
        <div className="flex items-center justify-between">
          <span>Pull Rate (Common Pack)</span>
          <span className="text-text text-xl font-semibold">{toPercentage(data.all)}</span>
        </div>
      }
      className="col-span-3"
    >
      <dl className="flex flex-col gap-3">
        <div className="text-text-muted/70 flex items-center justify-between text-sm leading-none font-medium">
          <dt>Cards 1-3</dt>
          <dd>{toPercentage(data['1-3'])}</dd>
        </div>

        <div className="text-text-muted flex items-center justify-between text-sm leading-none font-medium">
          <dt>Card 4</dt>
          <dd>{toPercentage(data['4'])}</dd>
        </div>

        <div className="text-text flex items-center justify-between text-sm leading-none font-medium">
          <dt>Card 5</dt>
          <dd>{toPercentage(data['5'])}</dd>
        </div>
      </dl>
    </InfoBox>
  );
}

export default PullRates;
