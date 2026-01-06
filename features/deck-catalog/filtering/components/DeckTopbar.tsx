'use client';

import { cn } from '@/shared/utils/cn';
import DeckSearchInput from './filters/DeckSearchInput';

interface Props {
  className?: string;
}

function DeckTopbar({ className }: Props) {
  return (
    <div className={cn('flex items-center', className)}>
      <DeckSearchInput />
    </div>
  );
}

export default DeckTopbar;
