'use client';

import useFilterState, { FilterSetters } from '@/lib/hooks/useFilterState';

function ClearAllFiltersButton() {
  const { setters } = useFilterState();

  const clearFilters = () => {
    // Clear all filters except the sorting ones, as the user most likely wants to keep the sorting
    const keys = Object.keys(setters) as Array<keyof FilterSetters>;

    keys.forEach(key => {
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
