'use client';

import { ChevronUpIcon } from 'lucide-react';

interface Props {
  show?: boolean;
}

function ScrollBackToTop({ show = false }: Props) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      className="bg-bg-2 hover:bg-bg-3 fixed right-10 bottom-10 flex cursor-pointer items-center justify-center gap-3 rounded-full px-4 py-3 pr-5 text-sm font-semibold transition-colors"
      onClick={handleClick}
    >
      <ChevronUpIcon size={24} />
      Back to Top
    </button>
  );
}

export default ScrollBackToTop;
