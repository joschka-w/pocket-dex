'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { ExtractQueryData } from '@/types/helpers';

async function fetchDecks() {
  // Everytime we create or update a deck, we have to revalidateTag/updateTag
  const supabase = await createClient({
    fetchOptions: {
      next: {
        revalidate: 60 * 60 * 24,
        tags: ['decks'],
      },
    },
  });

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
