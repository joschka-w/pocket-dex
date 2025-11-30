'use server';

import { createClient } from '../utils/supabase/server';
import { ExtractQueryData } from '@/types/helpers';

async function fetchSetData() {
  const supabase = await createClient({
    fetchOptions: {
      cache: 'force-cache',
      next: { tags: ['set-data'] },
    },
  });

  const query = supabase
    .from('set')
    .select(
      `
    *,
    packs:booster_pack (
      name,
      symbol
    )
  `
    )
    .order('release_date', { ascending: false });

  return await query;
}

export type SetsWithPacks = ExtractQueryData<typeof fetchSetData>;

export default fetchSetData;
