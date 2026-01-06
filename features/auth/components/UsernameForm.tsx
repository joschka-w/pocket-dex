'use client';

import { CheckIcon, LoaderIcon, XIcon } from 'lucide-react';

import { useUsernameForm } from '@/features/auth/hooks/useUsernameForm';
import LogoWithText from '@/shared/components/LogoWithText';
import TextInput from '@/shared/components/ui/TextInput';
import UsernameFormSuccessDialog from './UsernameFormSuccessDialog';

function UsernameForm() {
  const {
    error,
    handleChange,
    handleSubmit,
    register,
    isInitial,
    isValid,
    isSubmitting,
    isSubmitSuccessful,
    validationLoading,
  } = useUsernameForm();

  return (
    <>
      <UsernameFormSuccessDialog open={isSubmitSuccessful} />
      <form
        onSubmit={handleSubmit}
        className="bg-bg-1 mt-12 flex w-md flex-col gap-7 rounded-xl px-15 py-10"
      >
        <header className="flex w-full flex-col items-center">
          <LogoWithText />
          <h2 className="mt-6 text-center text-xl leading-none font-semibold">
            Choose your Username
          </h2>
          <p className="text-text-muted mt-4 w-full text-center text-sm leading-normal text-wrap">
            {
              "This is how you'll appear to others. Don't use your real name or any identifiable information."
            }
          </p>
        </header>

        <div className="bg-bg-2 inset-ring-bg-3 rounded-xl p-5 inset-ring-1">
          <h4 className="text-sm leading-none font-semibold">Username Requirements:</h4>
          <ul className="text-text-muted mt-3 ml-5 flex flex-col gap-1 text-sm leading-normal">
            <li className="list-disc">3-20 characters long</li>
            <li className="list-disc">Letters, numbers, periods, underscores and hyphens</li>
          </ul>
        </div>

        <div>
          <div>
            <label
              htmlFor="username-form-input"
              className="text-text-muted mb-2 ml-1 block text-sm leading-none font-semibold"
            >
              Username
            </label>
            <div className="relative">
              <TextInput
                {...register('username')}
                onChange={handleChange}
                error={error}
                isConfirmed={isValid}
                aria-invalid={Boolean(error)}
                type="text"
                id="username-form-input"
                placeholder="Enter your Username"
              />

              {!isInitial && (
                <div className="absolute top-2 right-3">
                  {validationLoading && <LoaderIcon className="animate-spin" />}
                  {!isInitial && !validationLoading && error && <XIcon className="text-danger" />}
                  {!isInitial && !validationLoading && !error && (
                    <CheckIcon className="text-confirmation" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          disabled={!isValid}
          type="submit"
          className="bg-primary inset-ring-bg-3 text-bg-base not-disabled:hover:bg-primary-light cursor-pointer rounded-xl px-4 py-2 text-base font-semibold inset-ring-1 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Loading...' : 'Choose Username'}
        </button>
      </form>
    </>
  );
}

export default UsernameForm;
