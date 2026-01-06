'use client';

import { ReactNode } from 'react';
import { ToggleGroup } from 'radix-ui';
import { SortAsc, SortDesc } from 'lucide-react';

import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import { SortDirection } from '@/features/card-catalog/filtering/config/card-filter-config';

function SortDirectionToggle() {
  const { state, setters } = useFilterState();

  const handleValueChange = (value: SortDirection) => {
    if (value) setters.sortDirection(value, { limitUrlUpdates: { method: 'debounce', timeMs: 0 } });
  };

  return (
    <>
      <ToggleGroup.Root
        value={state.sortDirection}
        onValueChange={handleValueChange}
        type="single"
        className="bg-bg-2 inset-ring-bg-3 flex h-9 w-full overflow-hidden rounded-lg inset-ring-1"
      >
        <Item value="asc">
          <SortAsc size={22} />
        </Item>

        <Item value="desc">
          <SortDesc size={22} />
        </Item>
      </ToggleGroup.Root>
    </>
  );
}

interface ItemProps {
  value: SortDirection;
  children?: ReactNode;
}

function Item({ value, children }: ItemProps) {
  return (
    <ToggleGroup.Item
      value={value}
      className="data-[state=on]:bg-primary data-[state=off]:active:text-text-muted data-[state=on]:text-bg-base flex aspect-square cursor-pointer items-center justify-center p-1"
    >
      {children}
    </ToggleGroup.Item>
  );
}

export default SortDirectionToggle;
