'use client';

import { TriangleAlertIcon } from 'lucide-react';

interface Props {
  message?: string;
  showRetryBtn?: boolean;
  onRetry?: () => void;
}

function Error({ message, onRetry, showRetryBtn = true }: Props) {
  const handleClick = () => {
    if (onRetry) onRetry();
    else window.location.reload();
  };

  return (
    <div className="flex h-fit flex-col items-center justify-center py-20">
      <TriangleAlertIcon className="text-text-muted mb-4" size={64} />
      <h3 className="text-danger mb-2 text-2xl font-semibold">Something went wrong</h3>
      {message && <p className="text-text-muted max-w-sm text-center">{message}</p>}

      {showRetryBtn && (
        <button
          onClick={handleClick}
          className="bg-bg-1 inset-ring-bg-2 hover:bg-bg-2 mt-7 cursor-pointer rounded-xl px-4 py-2 inset-ring-1 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default Error;
