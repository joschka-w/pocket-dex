'use client';

import { cn } from '@/shared/utils/cn';
import { SearchXIcon } from 'lucide-react';

interface Props {
  className?: string;
}

function NoCardsFound({ className }: Props) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', className)}>
      <SearchXIcon className="text-text-muted mb-4" size={64} />
      <h3 className="text-text mb-2 text-2xl font-semibold">No cards found</h3>
      <p className="text-text-muted max-w-sm">Try adjusting your filters or search criteria</p>
    </div>
  );
}

export default NoCardsFound;
