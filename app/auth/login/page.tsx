'use client';

import LogoWithText from '@/components/common/LogoWithText';
import Image from 'next/image';

import googleLogo from '@/assets/auth-provider-logos/google.svg';
import githubLogo from '@/assets/auth-provider-logos/github.svg';
import Link from 'next/link';
import { signInWithGoogle } from '@/lib/data/auth/signInWithGoogle';
import { signInWithGithub } from '@/lib/data/auth/signInWithGithub';

function LoginPage() {
  return (
    <form className="bg-bg-1 mt-12 flex w-md flex-col items-center rounded-xl px-15 pt-10 pb-7">
      <header className="flex w-full flex-col items-center">
        <LogoWithText />
        <h2 className="mt-6 text-center text-xl leading-none font-semibold">
          Welcome to PocketDex
        </h2>
        <p className="text-text-muted mt-4 w-full text-center text-sm leading-normal text-wrap">
          {'Sign in or create an account to start building your collection.'}
        </p>
      </header>

      <div className="mt-7 flex w-full flex-col gap-2">
        <button
          onClick={signInWithGoogle}
          type="button"
          className="bg-bg-2 hover:bg-bg-3 inset-ring-bg-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 font-semibold inset-ring-1 transition-colors"
        >
          <Image src={googleLogo} className="aspect-square w-5" alt="Google Logo" />
          Sign In With Google
        </button>

        <button
          onClick={signInWithGithub}
          type="button"
          className="bg-bg-2 hover:bg-bg-3 inset-ring-bg-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 font-semibold inset-ring-1 transition-colors"
        >
          <Image src={githubLogo} className="aspect-square w-5" alt="GitHub Logo" />
          Sign In With GitHub
        </button>
      </div>

      <p className="text-text-muted mt-10 text-xs">
        {'By continuing, you agree to our '}
        <Link href={'#'} className="hover:text-text underline transition-colors duration-100">
          Terms
        </Link>
        {' and '}
        <Link href={'#'} className="hover:text-text underline transition-colors duration-100">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

export default LoginPage;
