import LogoWithText from '@/shared/components/LogoWithText';
import Link from 'next/link';

import GoogleLoginButton from '@/features/auth/components/GoogleLoginButton';
import GithubLoginButton from '@/features/auth/components/GithubLoginButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

function LoginPage() {
  return (
    <form className="bg-bg-1 my-auto flex w-md flex-col items-center rounded-xl px-15 pt-10 pb-7">
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
        <GoogleLoginButton />
        <GithubLoginButton />
      </div>

      <p className="text-text-muted mt-10 text-xs">
        {'By continuing, you agree to our '}
        <Link href={'/terms'} className="hover:text-text underline transition-colors duration-100">
          Terms
        </Link>
        {' and '}
        <Link
          href={'/privacy'}
          className="hover:text-text underline transition-colors duration-100"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

export default LoginPage;
