import z from 'zod';
import { DECK_FILTER_DEFAULTS, DECK_SORT_FILTER } from '../config/deck-filter-config';
import { SORT_DIRECTION } from '@/features/card-catalog/filtering/config/card-filter-config';

export const deckFilterSchema = z.object({
  searchQuery: z
    .string("Invalid input for 'searchQuery' filter")
    .optional()
    .default(DECK_FILTER_DEFAULTS.searchQuery),

  sortBy: z
    .literal(DECK_SORT_FILTER, "Invalid input for 'sortBy' filter")
    .optional()
    .default(DECK_FILTER_DEFAULTS.sortBy),

  sortDirection: z
    .literal(SORT_DIRECTION, "Invalid input for 'sortDirection' filter")
    .optional()
    .default(DECK_FILTER_DEFAULTS.sortDirection),
});
