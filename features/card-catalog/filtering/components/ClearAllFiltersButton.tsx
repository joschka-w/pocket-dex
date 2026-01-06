'use client';

import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import getFilterParamsFromUrl from '@/features/card-catalog/filtering/utils/getFilterParamsFromUrl';
import { CardFilterSetters } from '@/types/filter-state';
import { useSearchParams } from 'next/navigation';
import { cardFilterParsers, cardFilterUrlKeys } from '../config/card-filter-config';

function ClearAllFiltersButton() {
  const { setters } = useFilterState();
  const params = useSearchParams();
  const filterParams = getFilterParamsFromUrl(
    Object.fromEntries(params.entries()),
    cardFilterParsers,
    { convertUrlKeys: true, urlKeys: cardFilterUrlKeys },
  );

  const clearFilters = () => {
    const keys = Object.keys(filterParams) as Array<keyof CardFilterSetters>;

    keys.forEach(key => {
      // Clear all filters except the sorting ones, as the user most likely wants to keep the sorting
      if (key === 'sortBy' || key === 'sortDirection') return;

      setters[key](null);
    });
  };

  return (
    <button
      onClick={clearFilters}
      className="text-text-muted hover:text-text active:text-text-muted cursor-pointer text-sm transition-colors hover:underline"
    >
      Clear all
    </button>
  );
}

export default ClearAllFiltersButton;
