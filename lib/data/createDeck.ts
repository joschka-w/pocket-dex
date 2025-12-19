'use server';

import { createClient } from '../utils/supabase/server';
import { DeckSchema } from '../validation/deck-validation-schema';

export async function createDeck(deck: DeckSchema) {
  const supabase = await createClient();

  return await supabase.rpc('create_deck', {
    p_cards: deck.cards,
    p_colors: deck.energies,
    p_description: deck.description || null,
    p_title: deck.title,
  });
}
