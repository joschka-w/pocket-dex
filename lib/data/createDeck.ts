'use server';

import { createClient } from '../utils/supabase/server';
import { DeckSchema } from '../validation/deck-validation-schema';
import { fetchUser } from './auth/fetchUser';

export async function createDeck(deck: DeckSchema) {
  const supabase = await createClient();

  const { profile } = await fetchUser();

  if (!profile?.username) {
    return {
      data: null,
      error: { message: 'Please choose a username before creating a deck' },
    };
  }

  return await supabase.rpc('create_deck', {
    p_cards: deck.cards,
    p_colors: deck.energies,
    p_description: deck.description || null,
    p_title: deck.title,
  });
}
