'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { Tables } from '@/types/database';

// Fetch all cards that are the same pokemon (card 'Pikachu ex' returns all pikachu cards)
export async function fetchSimilarCards(card: Pick<Tables<'card'>, 'id' | 'name'> | null) {
  if (!card) return { data: null };

  const supabase = await createClient({
    fetchOptions: {
      next: {
        revalidate: Infinity,
        tags: ['cards'],
      },
    },
  });

  const pokemonName = card.name.replace(/ ex$/, '');

  return await supabase
    .from('card')
    .select('*')
    .ilike('name', `%${pokemonName}%`)
    .neq('id', card.id)
    .order('id', { ascending: true });
}
