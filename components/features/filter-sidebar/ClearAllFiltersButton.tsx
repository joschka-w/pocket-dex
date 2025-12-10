'use client';

import useFilterState, { FilterSetters } from '@/lib/hooks/useFilterState';
import getFilterParamsFromUrl from '@/lib/utils/getFilterParamsFromUrl';
import { useSearchParams } from 'next/navigation';

function ClearAllFiltersButton() {
  const { setters } = useFilterState();
  const params = useSearchParams();
  const filterParams = getFilterParamsFromUrl(Object.fromEntries(params.entries()), true);

  const clearFilters = () => {
    const keys = Object.keys(filterParams) as Array<keyof FilterSetters>;

    keys.forEach(key => {
      // Clear all filters except the sorting ones, as the user most likely wants to keep the sorting
      if (key === 'sortBy' || key === 'sortDirection') return;

      setters[key](null);
    });
  };

  return (
    <button
      onClick={clearFilters}
      className="text-text-muted text-sm cursor-pointer hover:underline hover:text-text transition-colors active:text-text-muted"
    >
      Clear all
    </button>
  );
}

export default ClearAllFiltersButton;
