'use server';

import { createClient } from '@/shared/utils/supabase/server';
import { usernameValidationSchema } from '@/features/auth/schemas/username-validation-schema';
import z from 'zod';

export async function createUsername(username: string) {
  const { data: usernameValidated, error } = z.safeParse(usernameValidationSchema, username);

  const supabase = await createClient();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // TODO  - Return the error
  if (userError || !user) {
    throw new Error('Username could not be created');
  }

  return await supabase.from('profile').update({ username: usernameValidated }).eq('id', user.id);
}
