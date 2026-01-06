'use client';

import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import { CardSortFilter } from '@/features/card-catalog/filtering/config/card-filter-config';
import Select from '@/shared/components/ui/Select';

const sortNamesMap: Record<CardSortFilter, string> = {
  id: 'Id',
  name: 'Name',
  rarity: 'Rarity',
  color: 'Color',
  hp: 'HP',
};

function SortSelect() {
  const { state, setters } = useFilterState();

  const handleValueChange = (value: CardSortFilter) =>
    setters.sortBy(value, { limitUrlUpdates: { method: 'debounce', timeMs: 0 } });

  return (
    <Select.Root value={state.sortBy} onValueChange={handleValueChange}>
      <Select.Trigger placeholder="Sort" aria-label="Sort Cards">
        Sort by:
      </Select.Trigger>

      <Select.Content>
        {Object.entries(sortNamesMap).map(([value, displayText]) => (
          <Select.Item value={value} key={value}>
            {displayText}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default SortSelect;
