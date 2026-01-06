'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
      },
    },
  });

  // TODO - Add error handling
  if (error) {
    console.error('ERROR:', error);
    throw new Error(error.message);
  }

  redirect(data.url);
}
