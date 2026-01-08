'use client';

import Image from 'next/image';
import { startTransition, useActionState } from 'react';

import { signInWithGoogle } from '../api/signInWithGoogle';
import googleLogo from '@/assets/auth-provider-logos/google.svg';
import Loader from '@/shared/components/Loader';

function GoogleLoginButton() {
  const [state, formAction, loading] = useActionState(signInWithGoogle, null);
  const error = state?.message || null;

  const handleClick = () => {
    startTransition(formAction);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        data-loading={loading || undefined}
        className="bg-bg-2 hover:bg-bg-3 inset-ring-bg-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 font-semibold inset-ring-1 transition-colors data-loading:cursor-default data-loading:opacity-60"
      >
        {!loading && (
          <>
            <Image src={googleLogo} className="aspect-square w-5" alt="Google Logo" />
            Sign In With Google
          </>
        )}
        {loading && <Loader className="border-text w-6 border-4" />}
      </button>

      {error && !loading && <div className="text-danger mt-1 text-sm font-medium">{error}</div>}
    </div>
  );
}

export default GoogleLoginButton;
