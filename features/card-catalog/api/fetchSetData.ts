'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { ExtractQueryData } from '@/types/helpers';

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
