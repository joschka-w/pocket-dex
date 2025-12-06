'use client';

import { ReactNode } from 'react';
import { ToggleGroup } from 'radix-ui';
import { SortAsc, SortDesc } from 'lucide-react';

import useFilterState from '@/lib/hooks/useFilterState';
import { SortDirection } from '@/lib/filters/filterConfig';

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
        className="flex h-9 bg-bg-2 rounded-lg w-full overflow-hidden inset-ring-1 inset-ring-bg-3"
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
      className="aspect-square p-1 flex items-center justify-center cursor-pointer data-[state=on]:bg-primary data-[state=off]:active:text-text-muted data-[state=on]:text-bg-base"
    >
      {children}
    </ToggleGroup.Item>
  );
}

export default SortDirectionToggle;
