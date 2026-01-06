'use client';

import { PropsWithChildren, useCallback } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { CardFilterParsers } from '@/features/card-catalog/filtering/config/card-filter-config';

const filtersToSort: Set<keyof CardFilterParsers> = new Set(['cardType', 'color', 'rarity', 'set']);

function NuqsProvider({ children }: PropsWithChildren) {
  // Normalizing searchParams (same filters always are in the same order), so that we can use the URLState as a queryKey in tanstack-query.
  // This way we can cache the requests to the database that have the same filters applied.
  const sortParams = useCallback((params: URLSearchParams) => {
    const sorted = new URLSearchParams();

    const keys = Array.from(params.keys()).sort();

    for (const key of keys) {
      const values = params.getAll(key);

      if (filtersToSort.has(key as keyof CardFilterParsers)) {
        const sortedValue = values[0].split(',').sort().join(',');
        sorted.set(key, sortedValue);
      } else {
        values.sort().forEach(val => sorted.append(key, val));
      }
    }

    return sorted;
  }, []);

  return <NuqsAdapter processUrlSearchParams={sortParams}>{children}</NuqsAdapter>;
}

export default NuqsProvider;
