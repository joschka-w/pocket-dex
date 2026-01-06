'use client';

import { ReactNode } from 'react';
import { Popover } from 'radix-ui';
import { ChevronDownIcon } from 'lucide-react';
import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import { FilterKey } from '@/features/card-catalog/filtering/config/filterConfig';
import { cn } from '@/shared/utils/cn';

interface Props {
  name: string;
  filterKeys: FilterKey | FilterKey[];
  children?: ReactNode;
}

function FilterPopover({ name, filterKeys, children }: Props) {
  const { isActive: checkIsActive } = useFilterState();

  const isActive =
    typeof filterKeys === 'string'
      ? checkIsActive(filterKeys)
      : filterKeys.some(key => checkIsActive(key));

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={cn(
            'bg-bg-2 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-[filter,background-color]',
            !isActive && 'data-[state=open]:bg-bg-3/85 hover:data-[state=closed]:brightness-120',
            isActive &&
              'inset-ring-primary/70 bg-primary/10 hover:bg-primary/15 data-[state=open]:bg-primary/20 inset-ring-1',
          )}
        >
          {name}
          <ChevronDownIcon
            size={20}
            className={cn('text-text-muted -mr-1', isActive && 'text-text')}
          />
        </button>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        sideOffset={8}
        className="bg-bg-1 border-bg-2 z-30 max-w-xs min-w-2xs rounded-lg border px-5 py-4 shadow-lg shadow-black/50"
      >
        {children}
      </Popover.Content>
    </Popover.Root>
  );
}

export default FilterPopover;
