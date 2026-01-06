'use server';

import { createDeck } from '../../api/createDeck';
import { DeckSchema, deckValidationSchema } from '../schemas/deck-validation-schema';

export type FormError = { field: keyof DeckSchema | 'root'; message: string };

type SubmitDeckResult = {
  success: boolean;
  errors?: FormError[];
};

export async function submitDeck(deck: DeckSchema): Promise<SubmitDeckResult> {
  const { data: deckValidated, error: zodError } = deckValidationSchema.safeParse(deck);

  if (zodError) {
    const errors: FormError[] = zodError.issues.map(issue => ({
      field: (issue.path[0] as keyof DeckSchema) || 'root',
      message: issue.message,
    }));

    return {
      success: false,
      errors,
    };
  }

  const { error: supabaseError } = await createDeck(deckValidated);

  if (supabaseError) {
    return {
      success: false,
      errors: [{ field: 'root', message: supabaseError.message }],
    };
  }

  return {
    success: true,
  };
}
