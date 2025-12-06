'use client';

import { Select } from 'radix-ui';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import useFilterState from '@/lib/hooks/useFilterState';
import { SortFilter } from '@/lib/filters/filterConfig';
import { useId } from 'react';

const sortNamesMap: Record<SortFilter, string> = {
  id: 'Id',
  name: 'Name',
  rarity: 'Rarity',
  color: 'Color',
  hp: 'HP',
};

function SortSelect() {
  const id = useId();
  const { state, setters } = useFilterState();

  const handleValueChange = (value: SortFilter) =>
    setters.sortBy(value, { limitUrlUpdates: { method: 'debounce', timeMs: 0 } });

  return (
    <Select.Root value={state.sortBy} onValueChange={handleValueChange}>
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="text-nowrap">
          Sort by:
        </label>
        <Select.Trigger
          id={id}
          className="cursor-pointer h-9 min-w-32 w-full flex items-center py-2 px-3 justify-between rounded-lg bg-bg-2 focus:outline-1 outline-neutral-400"
        >
          <Select.Value placeholder="Sort by:" className="text-text" aria-label="Sorting" />
          <Select.Icon>
            <ChevronDownIcon size={20} />
          </Select.Icon>
        </Select.Trigger>
      </div>
      <Select.Content
        align="start"
        position="popper"
        sideOffset={8}
        className="bg-bg-2 rounded-lg p-1.5 w-(--radix-select-trigger-width)"
      >
        {Object.entries(sortNamesMap).map(([value, displayText]) => (
          <Select.Item
            value={value}
            key={value}
            className="bg-transparent data-highlighted:bg-bg-3 py-1 flex items-center justify-between cursor-pointer px-3 outline-none rounded-lg select-none group"
          >
            <Select.ItemText>{displayText}</Select.ItemText>

            <CheckIcon size={16} className="group-data-[state=unchecked]:hidden" />
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default SortSelect;
