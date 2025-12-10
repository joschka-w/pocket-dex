'use client';

import { ReactNode } from 'react';
import { Popover } from 'radix-ui';
import { ChevronDownIcon } from 'lucide-react';
import useFilterState from '@/lib/hooks/useFilterState';
import { FilterKey } from '@/lib/filters/filterConfig';
import { cn } from '@/lib/utils/cn';

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
            'flex items-center text-sm font-medium py-1.5 px-4 rounded-lg gap-2 cursor-pointer bg-bg-2 transition-[filter,background-color]',
            !isActive && 'data-[state=open]:bg-bg-3/85 hover:data-[state=closed]:brightness-120',
            isActive &&
              'inset-ring-1 inset-ring-primary/70 bg-primary/10 hover:bg-primary/15 data-[state=open]:bg-primary/20'
          )}
        >
          {name}{' '}
          <ChevronDownIcon
            size={20}
            className={cn('text-text-muted -mr-1', isActive && 'text-text')}
          />
        </button>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        sideOffset={8}
        className="bg-bg-1 z-30 px-5 py-4 border border-bg-2 rounded-lg shadow-lg max-w-xs min-w-2xs shadow-black/50"
      >
        {children}
      </Popover.Content>
    </Popover.Root>
  );
}

export default FilterPopover;
