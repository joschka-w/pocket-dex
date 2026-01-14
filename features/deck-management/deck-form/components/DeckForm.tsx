'use client';

import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import useDeckForm from '../../deck-builder/hooks/useDeckForm';

import TextArea from '@/shared/components/ui/TextArea';
import TextInput from '@/shared/components/ui/TextInput';
import DeckEnergySelect from './DeckEnergySelect';
import DeckFormSuccessModal from './DeckFormSuccessModal';

function DeckForm() {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    formKey,
    modalOpen,
    setModalOpen,
  } = useDeckForm();

  return (
    <>
      <DeckFormSuccessModal open={modalOpen} setOpen={setModalOpen} />

      <form key={formKey} onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextInput {...register('title')} placeholder="Deck Name" error={errors.title?.message} />

        <TextArea
          {...register('description')}
          rows={3}
          placeholder="Description (optional)"
          error={errors.description?.message}
        />

        <div className="flex items-start gap-3">
          <Controller
            name="energies"
            control={control}
            render={({ field }) => (
              <DeckEnergySelect className="w-fit" {...field} error={errors.energies?.message} />
            )}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-light text-bg-1 grow cursor-pointer rounded-lg px-3 py-2 font-semibold transition-colors"
          >
            {isSubmitting ? 'Loading...' : 'Publish Deck'}
          </button>
        </div>

        <div className="-mt-1.5 ml-1 flex flex-col">
          <ErrorMessage
            // The keys are necessary to actually 'update' these components when errors are present
            key={`error-root-${JSON.stringify(errors.root)}`}
            name="root"
            as="span"
            errors={errors}
            className="text-danger text-sm"
          />
          <ErrorMessage
            key={`error-cards-${JSON.stringify(errors.cards)}`}
            name="cards"
            as="span"
            errors={errors}
            className="text-danger text-sm"
          />
        </div>
      </form>
    </>
  );
}

export default DeckForm;
