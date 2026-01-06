'use server';

import { createClient } from '../../../shared/utils/supabase/server';

export async function fetchCardCountPerPack(packId: number) {
  const supabase = await createClient({
    fetchOptions: {
      next: {
        revalidate: 60 * 60 * 24 * 7,
      },
    },
  });

  return await supabase.rpc('get_card_count', { pack_id: packId });
}
