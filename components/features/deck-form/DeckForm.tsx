'use client';

import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import useDeckForm from '@/lib/hooks/useDeckForm';
import TextArea from '@/components/ui/TextArea';
import TextInput from '@/components/ui/TextInput';
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

        <div className="flex gap-3 items-start">
          <Controller
            name="energies"
            control={control}
            render={({ field }) => (
              <DeckEnergySelect className="w-fit" {...field} error={errors.energies?.message} />
            )}
          />
          <button
            type="submit"
            className="bg-primary cursor-pointer hover:bg-primary-light transition-colors text-bg-1 grow py-2 px-3 font-semibold rounded-lg"
          >
            {isSubmitting ? 'Loading...' : 'Publish Deck'}
          </button>
        </div>

        <div className="flex flex-col -mt-1.5 ml-1">
          <ErrorMessage
            // The keys are necessary to actually 'update' these components when errors are present
            key={`error-root-${JSON.stringify(errors.root)}`}
            name="root"
            as="span"
            errors={errors}
            className="text-sm text-danger"
          />
          <ErrorMessage
            key={`error-cards-${JSON.stringify(errors.cards)}`}
            name="cards"
            as="span"
            errors={errors}
            className="text-sm text-danger"
          />
        </div>
      </form>
    </>
  );
}

export default DeckForm;
