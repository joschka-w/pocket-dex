import { CardResult } from '@/features/card-detail/api/fetchCard';
import InfoBox from '../InfoBox';

interface Props {
  card: CardResult;
}

function Expansion({ card }: Props) {
  return (
    <InfoBox
      label={
        <div className="flex items-center justify-between">
          <span>Expansion</span>
          <span className="text-text text-base font-semibold">{card.set.name}</span>
        </div>
      }
      className="col-span-3"
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
