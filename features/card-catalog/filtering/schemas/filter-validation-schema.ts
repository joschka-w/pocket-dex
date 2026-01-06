import z from 'zod';

import { Constants } from '@/types/database-generated';
import {
  CARD_TYPE_FILTERS,
  CARD_EX_FILTER,
  CARD_FILTER_DEFAULTS,
  SORT_DIRECTION,
  CARD_SORT_FILTER,
} from '../config/card-filter-config';

export const filterValidationSchema = z.object({
  set: z
    .array(z.string(), "Invalid input for 'set' filter")
    .optional()
    .default(CARD_FILTER_DEFAULTS.set),

  color: z
    .array(z.literal([...Constants.public.Enums.color]), "Invalid input for 'color' filter")
    .optional()
    .default([...CARD_FILTER_DEFAULTS.color]),

  rarity: z
    .array(z.literal([...Constants.public.Enums.rarity]), "Invalid input for 'rarity' filter")
    .optional()
    .default([...CARD_FILTER_DEFAULTS.rarity]),

  minHp: z.int("Invalid input for 'minHp' filter").optional().default(CARD_FILTER_DEFAULTS.minHp),
  maxHp: z.int("Invalid input for 'maxHp' filter").optional().default(CARD_FILTER_DEFAULTS.maxHp),

  cardType: z
    .array(z.literal(CARD_TYPE_FILTERS), "Invalid input for 'cardType' filter")
    .optional()
    .default([...CARD_FILTER_DEFAULTS.cardType]),

  ex: z
    .literal(CARD_EX_FILTER, "Invalid input for 'ex' filter")
    .optional()
    .default(CARD_FILTER_DEFAULTS.ex),

  searchQuery: z
    .string("Invalid input for 'searchQuery' filter")
    .optional()
    .default(CARD_FILTER_DEFAULTS.searchQuery),

  sortBy: z
    .literal(CARD_SORT_FILTER, "Invalid input for 'sortBy' filter")
    .optional()
    .default(CARD_FILTER_DEFAULTS.sortBy),

  sortDirection: z
    .literal(SORT_DIRECTION, "Invalid input for 'sortDirection' filter")
    .optional()
    .default(CARD_FILTER_DEFAULTS.sortDirection),
});
