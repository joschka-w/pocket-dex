import { SortDirection } from '@/features/card-catalog/filtering/config/card-filter-config';
import DirectionToggle from '@/shared/components/ui/DirectionToggle';
import { useDeckFilterState } from '../../hooks/useDeckFilterState';

function DeckSortDirectionToggle() {
  const { state, setters } = useDeckFilterState();

  const handleValueChange = (value: SortDirection) => {
    if (value) setters.sortDirection(value, { limitUrlUpdates: { method: 'debounce', timeMs: 0 } });
  };

  return <DirectionToggle value={state.sortDirection} onValueChange={handleValueChange} />;
}

export default DeckSortDirectionToggle;
