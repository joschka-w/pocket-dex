'use server';

import { createClient } from '../../../shared/utils/supabase/server';
import { CardResult } from '../types/fetch-card-types';

export async function fetchCard(cardId: string) {
  const supabase = await createClient({
    fetchOptions: {
      next: {
        revalidate: Infinity,
        tags: ['cards'],
      },
    },
  });

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
