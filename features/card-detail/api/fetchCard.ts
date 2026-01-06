'use server';

import { Tables } from '@/types/database';
import { createClient } from '../../../shared/utils/supabase/server';

export async function fetchCard(cardId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('card')
    .select(
      `
      *,
      pokemon_card (
        *,
        attack (*)
      ),
      trainer_card (*),
      set (symbol, name),
      packs:card_booster_pack_link!card_id (
        booster_pack(
          id,
          name
        )
      )
      `,
    )
    .eq('id', cardId)
    .limit(1)
    .maybeSingle();

  return { data: data as CardResult, error };
}

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
