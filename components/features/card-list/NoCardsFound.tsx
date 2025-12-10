'use client';

import { cn } from '@/lib/utils/cn';
import { SearchXIcon } from 'lucide-react';

interface Props {
  className?: string;
}

function NoCardsFound({ className }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', className)}>
      <SearchXIcon className="mb-4 text-text-muted" size={64} />
      <h3 className="text-2xl font-semibold text-text mb-2">No cards found</h3>
      <p className="text-text-muted max-w-sm">Try adjusting your filters or search criteria</p>
    </div>
  );
}

export default NoCardsFound;
