import { Tables } from '@/types/database';

interface Props {
  card: Tables<'card_view_new'>;
}

function CardInfo({ card }: Props) {
  return (
    <>
      <h4 className="mt-2 font-semibold">{card.name}</h4>
      <div className="mt-0.5 text-text-muted font-bold text-sm">{card.id}</div>
    </>
  );
}

export default CardInfo;
