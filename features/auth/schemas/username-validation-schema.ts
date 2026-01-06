import z from 'zod';

export const usernameValidationSchema = z
  .string("Username has to be of type 'string'")
  .min(3, 'Username has to be at least 3 characters long')
  .max(20, 'Username can not be longer than 20 characters')
  .regex(
    /^[a-zA-Z0-9_.-]+$/i,
    'Username can only contain letters, numbers, periods, underscores and hyphens',
  );
