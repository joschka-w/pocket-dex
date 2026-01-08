'use server';

import z from 'zod';

import { createClient } from '@/shared/utils/supabase/server';
import { usernameValidationSchema } from '@/features/auth/schemas/username-validation-schema';

export async function createUsername(username: string) {
  const { data: usernameValidated, error: zodError } = z.safeParse(
    usernameValidationSchema,
    username,
  );

  const supabase = await createClient();

  if (zodError) {
    console.error(zodError);
    throw new Error(zodError.message);
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: Error('Unable to authenticate user. Please log in and try again.'),
    };
  }

  const { data, error: updateUsernameError } = await supabase
    .from('profile')
    .update({ username: usernameValidated })
    .eq('id', user.id);

  return {
    data,
    error: updateUsernameError
      ? Error('There was an error while creating the username. Please try again later.')
      : null,
  };
}
