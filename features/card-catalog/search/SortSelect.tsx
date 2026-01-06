'use client';

import { Select } from 'radix-ui';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import { SortFilter } from '@/features/card-catalog/filtering/config/filterConfig';
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
          className="bg-bg-2 flex h-9 w-full min-w-32 cursor-pointer items-center justify-between rounded-lg px-3 py-2 outline-neutral-400 focus:outline-1"
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
        className="bg-bg-2 w-(--radix-select-trigger-width) rounded-lg p-1.5"
      >
        {Object.entries(sortNamesMap).map(([value, displayText]) => (
          <Select.Item
            value={value}
            key={value}
            className="data-highlighted:bg-bg-3 group flex cursor-pointer items-center justify-between rounded-lg bg-transparent px-3 py-1 outline-none select-none"
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
