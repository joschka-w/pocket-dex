import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useDebouncedCallback } from 'use-debounce';

import { usernameValidationSchema } from '../validation/username-validation-schema';
import { isUsernameTaken } from '../data/auth/isUsernameTaken';
import { createUsername } from '../data/auth/createUsername';

export function useUsernameForm(debounceTime: number = 400) {
  const [isTaken, setIsTaken] = useState(false);
  const [validationLoading, setValidationLoading] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit: handleSubmitIntern,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    trigger,
  } = useForm({
    resolver: zodResolver(z.object({ username: usernameValidationSchema })),
  });

  const error =
    errors.username?.message ||
    errors.root?.message ||
    (isTaken ? 'Username is already taken' : undefined);

  const isInitial = validationLoading === null;
  const isValid = !isInitial && !error && !validationLoading;

  const validateUsernameDebounced = useDebouncedCallback(async (input: string) => {
    const res = await isUsernameTaken(input);

    trigger('username');

    if (!res || res.error) {
      setValidationLoading(false);
      return;
    }

    setIsTaken(res.data);
    setValidationLoading(false);
  }, debounceTime);

  const handleSubmit = handleSubmitIntern(async data => {
    const { error } = await createUsername(data.username);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValidationLoading(true);
    validateUsernameDebounced(e.target.value);
    register('username').onChange(e);
  };

  return {
    handleSubmit,
    handleChange,
    error,
    validationLoading,
    isInitial,
    isSubmitting,
    isSubmitSuccessful,
    isValid,
    register,
  };
}
