import z from 'zod';

import {
  CARD_TYPE_FILTERS,
  EX_FILTER,
  FILTER_DEFAULTS,
  SORT_DIRECTION,
  SORT_FILTER,
} from '../filters/filterConfig';
import { Constants } from '@/types/database-generated';

export const filterValidationSchema = z.object({
  set: z
    .array(z.string(), "Invalid input for 'set' filter")
    .optional()
    .default(FILTER_DEFAULTS.set),

  color: z
    .array(z.literal([...Constants.public.Enums.color]), "Invalid input for 'color' filter")
    .optional()
    .default([...FILTER_DEFAULTS.color]),

  rarity: z
    .array(z.literal([...Constants.public.Enums.rarity]), "Invalid input for 'rarity' filter")
    .optional()
    .default([...FILTER_DEFAULTS.rarity]),

  minHp: z.int("Invalid input for 'minHp' filter").optional().default(FILTER_DEFAULTS.minHp),
  maxHp: z.int("Invalid input for 'maxHp' filter").optional().default(FILTER_DEFAULTS.maxHp),

  cardType: z
    .array(z.literal(CARD_TYPE_FILTERS), "Invalid input for 'cardType' filter")
    .optional()
    .default([...FILTER_DEFAULTS.cardType]),

  ex: z.literal(EX_FILTER, "Invalid input for 'ex' filter").optional().default(FILTER_DEFAULTS.ex),

  searchQuery: z
    .string("Invalid input for 'searchQuery' filter")
    .optional()
    .default(FILTER_DEFAULTS.searchQuery),

  sortBy: z
    .literal(SORT_FILTER, "Invalid input for 'sortBy' filter")
    .optional()
    .default(FILTER_DEFAULTS.sortBy),

  sortDirection: z
    .literal(SORT_DIRECTION, "Invalid input for 'sortDirection' filter")
    .optional()
    .default(FILTER_DEFAULTS.sortDirection),
});
