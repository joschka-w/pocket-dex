'use client';

import Error from '@/shared/components/Error';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

function ErrorFallback({ error }: Props) {
  return <Error message={`Something went wrong: ${error.message}`} />;
}

export default ErrorFallback;
