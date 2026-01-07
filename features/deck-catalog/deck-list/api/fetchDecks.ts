'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { ExtractQueryData } from '@/types/helpers';
import { LoaderInput } from 'nuqs/server';
import {
  DECK_FILTER_DEFAULTS,
  DeckSortFilter,
  loadDeckSearchParams,
} from '../../filtering/config/deck-filter-config';
import { deckFilterSchema } from '../../filtering/schemas/deck-filter-schema';

export async function fetchDecks(searchParams: LoaderInput) {
  // Everytime we create or update a deck, we have to revalidateTag/updateTag
  const supabase = await createClient({
    fetchOptions: {
      next: {
        revalidate: 60 * 60 * 24,
        tags: ['decks'],
      },
    },
  });

  const filtersUnvalidated = loadDeckSearchParams(searchParams);
  const filters = deckFilterSchema.parse(filtersUnvalidated);

  let query = supabase.from('deck').select(
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
  );
  // .order('created_at', { ascending: false });

  if (filters.searchQuery !== DECK_FILTER_DEFAULTS.searchQuery) {
    query = query.ilike('title', `%${filters.searchQuery.trim()}%`);
  }

  const sortFilterMap: Record<DeckSortFilter, string> = {
    date: 'created_at',
    favorites: 'likes_count',
  };

  query = query.order(sortFilterMap[filters.sortBy], {
    ascending: filters.sortDirection === 'asc',
    nullsFirst: false,
  });

  return await query;
}

export type DecksResult = ExtractQueryData<typeof fetchDecks>;
export type DeckResult = NonNullable<DecksResult>[number];
