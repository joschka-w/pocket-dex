import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { deckValidationSchema, DeckSchema } from '../validation/deck-validation-schema';
import { FormError, submitDeck } from '../actions/submitDeck';
import { useDeck } from './useDeck';

// TODO - This is insanity, refactor this
function useDeckForm() {
  const { resetDeck, deck } = useDeck();
  const [formKey, setFormKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit: handleSubmitIntern,
    setValue,
    setError,
    reset: resetForm,
    control,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm<DeckSchema>({
    resolver: zodResolver(deckValidationSchema),
    defaultValues: { cards: {}, description: '', energies: [], title: '' },
  });

  // Manually sync currentDeck with react-hook-form
  // Card validation only triggers after user attempts submission
  useEffect(() => {
    const cards = Object.fromEntries(deck.entries().map(([id, card]) => [id, card.quantity]));

    setValue('cards', cards, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: isSubmitted,
    });
  }, [deck, isSubmitted, isSubmitting, setValue]);

  // https://react-hook-form.com/docs/useform/reset
  // Per react-hook-form docs: 'It's recommended to reset inside useEffect after submission.'
  useEffect(() => {
    if (!isSubmitSuccessful) return;

    // TODO - Add success modal or something similar to show user that it was successful
    resetForm();
    resetDeck();
  }, [isSubmitSuccessful, resetDeck, resetForm]);

  const onErrors = (errors: FormError[]) => {
    errors.forEach(({ field, message }) => setError(field, { message }));
  };

  const handleSubmit = handleSubmitIntern(async data => {
    const { success, errors } = await submitDeck(data);

    if (errors) onErrors(errors);
    if (success) {
      setModalOpen(true);

      // This is a hack to re-mount the form after a successful submission,
      // otherwise the internal form state breaks for some reason.
      setFormKey(prev => prev + 1);
    }
  });

  return {
    register,
    control,
    errors,
    isSubmitting,
    handleSubmit,
    modalOpen,
    setModalOpen,
    formKey: `deck-builder-form-key-${formKey}`,
  };
}

export default useDeckForm;
