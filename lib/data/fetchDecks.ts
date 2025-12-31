'use server';

import { ExtractQueryData } from '@/types/helpers';
import { createClient } from '../utils/supabase/client';

async function fetchDecks() {
  const supabase = createClient();

  return await supabase
    .from('deck')
    .select(
      `
      *,
      cards:deck_card_link!deck_id (
        quantity,
        card (
          id,
          name,
          image_path,
          image_placeholder,
          rarity
        )
    )
    `,
    )
    .order('created_at', { ascending: false });
}

export type DecksResult = ExtractQueryData<typeof fetchDecks>;
export type DeckResult = NonNullable<DecksResult>[number];

export default fetchDecks;
