'use server';

import { updateTag } from 'next/cache';

import { createClient } from '../../../shared/utils/supabase/server';
import { DeckSchema } from '../deck-form/schemas/deck-validation-schema';
import { fetchUser } from '../../auth/api/fetchUser';

export async function createDeck(deck: DeckSchema) {
  const supabase = await createClient();

  const { profile, user } = await fetchUser();

  if (!user) {
    return {
      data: null,
      error: { message: 'Please create an account or log in to create a deck.' },
    };
  }

  if (!profile?.username) {
    return {
      data: null,
      error: {
        message: 'Please set up your username in your profile settings before creating a deck.',
      },
    };
  }

  const res = await supabase.rpc('create_deck', {
    p_cards: deck.cards,
    p_colors: deck.energies,
    p_description: deck.description || null,
    p_title: deck.title,
  });

  if (!res.error) updateTag('decks');

  return res;
}
