'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { Tables } from '@/types/database';
import { User } from '@supabase/supabase-js';

type FetchUserReturnType =
  | {
      profile: Tables<'profile'>;
      user: User;
      error: null;
    }
  | {
      profile: null;
      user: null;
      error: Error;
    };

export async function fetchUser(): Promise<FetchUserReturnType> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: new Error(authError?.message || 'No user found'),
      profile: null,
      user: null,
    };
  }

  const { data: profile, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    return {
      error,
      profile: null,
      user: null,
    };
  }

  return {
    error: null,
    profile,
    user,
  };
}
