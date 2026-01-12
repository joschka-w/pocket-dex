import { Tables } from '@/types/database';

interface Props {
  card: Pick<Tables<'card_view'>, 'id' | 'name'>;
}

function CardInfo({ card }: Props) {
  return (
    <>
      <h4 className="mt-3 leading-none font-semibold">{card.name}</h4>
      <div className="text-text-muted mt-2 mb-1 text-sm leading-none font-bold">{card.id}</div>
    </>
  );
}

export default CardInfo;
