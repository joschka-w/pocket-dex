'use server';

import { createClient } from '@/shared/utils/supabase/server';

export async function fetchUserLikes(userId?: string): Promise<Set<string>> {
  const supabase = await createClient();

  if (!userId) return new Set();

  const { data } = await supabase.from('deck_likes').select('deck_id').eq('user_id', userId);
  if (!data) return new Set();

  return new Set(data.map(d => d.deck_id));
}
