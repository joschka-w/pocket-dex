'use client';

import Select from '@/shared/components/ui/Select';
import { DeckSortFilter } from '../../config/deck-filter-config';
import { useDeckFilterState } from '../../hooks/useDeckFilterState';

const sortNamesMap: Record<DeckSortFilter, string> = {
  favorites: 'Favorites',
  date: 'Date',
};

interface Props {
  className?: string;
}

function DeckSortSelect({ className }: Props) {
  const { state, setters } = useDeckFilterState();

  const handleChange = (val: DeckSortFilter) => {
    setters.sortBy(val, { limitUrlUpdates: { method: 'debounce', timeMs: 0 } });
  };
  return (
    <Select.Root value={state.sortBy} onValueChange={handleChange}>
      <Select.Trigger placeholder="Sort by..." aria-label="Sort Decks" className={className}>
        Sort by:
      </Select.Trigger>

      <Select.Content>
        {Object.entries(sortNamesMap).map(([value, displayText]) => {
          return (
            <Select.Item value={value} key={value}>
              {displayText}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
}

export default DeckSortSelect;
