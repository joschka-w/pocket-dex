'use server';

import { createClient } from '@/lib/utils/supabase/server';
import { usernameValidationSchema } from '@/lib/validation/username-validation-schema';
import z from 'zod';

export async function isUsernameTaken(input: string) {
  const supabase = await createClient();

  const { data: inputValidated, error } = z.safeParse(usernameValidationSchema, input);

  // zod errors are handled on the client and on username creation, so we don't need to return the error here
  if (error) return null;

  return await supabase.rpc('username_exists', { input_username: inputValidated });
}
