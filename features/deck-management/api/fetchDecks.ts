'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { ExtractQueryData } from '@/types/helpers';

async function fetchDecks() {
  const supabase = await createClient();

  return await supabase
    .from('deck')
    .select(
      `
      title,
      description,
      colors,
      created_at,
      likes_count,
      id,
      author(
        username
      ),
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
