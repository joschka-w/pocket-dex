import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { currentDeckAtom } from '../atoms/deckBuilder';
import { deckValidationSchema, DeckValidationSchema } from '../validation/deck-validation-schema';
import { zodResolver } from '@hookform/resolvers/zod';

function useDeckForm() {
  const currentDeck = useAtomValue(currentDeckAtom);

  const {
    register,
    handleSubmit: handleSubmitIntern,
    setValue,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<DeckValidationSchema>({ resolver: zodResolver(deckValidationSchema) });

  // Manually sync cards with react-hook-form
  // Card validation only triggers after user attempts submission
  useEffect(() => {
    const cards = Object.fromEntries(
      currentDeck.entries().map(([id, card]) => [id, card.quantity])
    );

    setValue('cards', cards, { shouldDirty: true, shouldTouch: true, shouldValidate: isSubmitted });
  }, [currentDeck, isSubmitted, setValue]);

  const handleSubmit = handleSubmitIntern(data => console.log(data));

  return { register, control, errors, isSubmitting, handleSubmit };
}

export default useDeckForm;
