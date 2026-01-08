import { Tables } from '@/types/database';

type PacksArray = Array<{ booster_pack: Pick<Tables<'booster_pack'>, 'id' | 'name'> }>;

// Discriminated union (pokemon_card | trainer_card) for better type safety
export type CardResult = Omit<Tables<'card'>, 'card_type'> &
  (PokemonCard | TrainerCard) & {
    packs: PacksArray;
    set: { symbol: string; name: string };
  };

type PokemonCard = {
  card_type: 'pokemon';
  pokemon_card: Tables<'pokemon_card'> & { attack: Array<Tables<'attack'>> };
};

type TrainerCard = {
  card_type: 'trainer';
  trainer_card: Tables<'trainer_card'>;
};

export type PokemonCardResult = Extract<CardResult, { card_type: 'pokemon' }>;
export type TrainerCardResult = Extract<CardResult, { card_type: 'trainer' }>;
