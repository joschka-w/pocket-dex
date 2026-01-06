'use client';

import { cn } from '@/shared/utils/cn';
import DeckSearchInput from './filters/DeckSearchInput';
import DeckSortSelect from './filters/DeckSortSelect';
import DeckSortDirectionToggle from './filters/DeckSortDirectionToggle';

interface Props {
  className?: string;
}

function DeckTopbar({ className }: Props) {
  return (
    <div className={cn('flex items-center', className)}>
      <DeckSearchInput />

      <div className="ml-auto flex gap-2">
        <DeckSortSelect />
        <DeckSortDirectionToggle />
      </div>
    </div>
  );
}

export default DeckTopbar;
