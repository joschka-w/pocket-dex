'use client';

import Image from 'next/image';
import { signInWithGithub } from '../api/signInWithGithub';
import githubLogo from '@/assets/auth-provider-logos/github.svg';
import { startTransition, useActionState } from 'react';
import Loader from '@/shared/components/Loader';

function GithubLoginButton() {
  const [state, formAction, loading] = useActionState(signInWithGithub, null);
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
            <Image src={githubLogo} className="aspect-square w-5" alt="GitHub Logo" />
            Sign In With GitHub
          </>
        )}
        {loading && <Loader className="border-text w-6 border-4" />}
      </button>

      {error && !loading && <div className="text-danger mt-1 text-sm font-medium">{error}</div>}
    </div>
  );
}

export default GithubLoginButton;
