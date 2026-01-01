'use server';

import { ExtractQueryData } from '@/types/helpers';
import { createClient } from '../utils/supabase/server';

async function fetchSetData() {
  const supabase = await createClient({
    fetchOptions: {
      cache: 'force-cache',
      next: { tags: ['set-data'] },
    },
  });

  return await supabase
    .from('set')
    .select(
      `
      *,
      packs:booster_pack (
        name,
        symbol
    )
    `,
    )
    .order('release_date', { ascending: false });
}

export type SetsWithPacks = ExtractQueryData<typeof fetchSetData>;

export default fetchSetData;
