import { cn } from '@/shared/utils/cn';
import { CardResult } from '../../types/fetch-card-types';
import InfoBox from '../InfoBox';

interface Props {
  card: CardResult;
  className?: string;
}

function Expansion({ card, className }: Props) {
  return (
    <InfoBox
      label={
        <div className="flex items-center justify-between">
          <span>Expansion</span>

          <div className="flex gap-2 text-base font-semibold">
            <span className="text-text">{card.set.name}</span>
            <span className="text-text-muted">{`(${card.set_symbol})`}</span>
          </div>
        </div>
      }
      className={cn('col-span-3', className)}
    >
      {card.packs.length >= 1 && (
        <>
          <h5 className="text-text-muted text-sm leading-none font-medium">Available In</h5>
          <ul className="mt-3 flex flex-wrap gap-2">
            {card.packs.map(pack => (
              <li
                key={`available-in-key-${pack.booster_pack.id}`}
                className="bg-bg-2 inset-ring-bg-3 w-fit rounded-lg px-3 py-2 text-sm leading-none font-normal inset-ring-1"
              >
                {pack.booster_pack.name} Pack
              </li>
            ))}
          </ul>
        </>
      )}
    </InfoBox>
  );
}

export default Expansion;
