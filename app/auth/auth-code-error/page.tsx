'use client';

import Error from '@/shared/components/Error';
import { useRouter } from 'next/navigation';

function AuthCodeErrorPage() {
  const router = useRouter();
  const message =
    'Something went wrong trying to authenticate the user. Please try logging in again.';

  const handleRetry = () => router.replace('/auth/login');

  return <Error message={message} onRetry={handleRetry} />;
}

export default AuthCodeErrorPage;
