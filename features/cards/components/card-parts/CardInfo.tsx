import { Tables } from '@/types/database';

interface Props {
  card: Pick<Tables<'card_view_new'>, 'id' | 'name'>;
}

function CardInfo({ card }: Props) {
  return (
    <>
      <h4 className="mt-2 font-semibold">{card.name}</h4>
      <div className="text-text-muted mt-0.5 text-sm font-bold">{card.id}</div>
    </>
  );
}

export default CardInfo;
