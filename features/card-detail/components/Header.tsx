import Image from 'next/image';
import { getColorImg, getRarityImg } from '@/shared/constants/asset-maps';
import { CardResult } from '@/features/card-detail/api/fetchCard';

interface Props {
  card: CardResult;
}

function Header({ card }: Props) {
  return (
    <header className="flex w-full items-start justify-between">
      <div className="grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] items-center gap-3">
        <h1 className="col-span-2 text-4xl font-bold">{card.name}</h1>
        {card.rarity !== 'promo' && <Image src={getRarityImg(card.rarity)} alt={card.rarity} />}
        <span className="text-text-muted font-semibold">{card.id}</span>
      </div>

      {card.card_type === 'pokemon' && (
        <Image
          className="aspect-square w-12"
          src={getColorImg(card.pokemon_card.type)}
          alt={card.pokemon_card.type}
        />
      )}
    </header>
  );
}

export default Header;
