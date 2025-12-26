'use server';

import { Tables } from '@/types/database';
import { createClient } from '../utils/supabase/client';

// Fetch all cards that are the same pokemon (card 'Pikachu ex' returns all pikachu cards)
export async function fetchSimilarCards(card: Pick<Tables<'card'>, 'id' | 'name'>) {
  const supabase = createClient();

  const pokemonName = card.name.replace(/ ex$/, '');

  return await supabase
    .from('card')
    .select('*')
    .ilike('name', `%${pokemonName}%`)
    .neq('id', card.id)
    .order('id', { ascending: true });
}
