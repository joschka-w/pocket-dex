import { Constants } from '@/types/database-generated';
import {
  createLoader,
  inferParserType,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  UrlKeys,
} from 'nuqs/server';

export type CardFilterParsers = typeof cardFilterParsers;
export type CardFilterKey = keyof CardFilterParsers;
export type CardFilterState<K extends keyof inferParserType<CardFilterParsers>> =
  inferParserType<CardFilterParsers>[K];

export type CardTypeFilter = (typeof CARD_TYPE_FILTERS)[number];
export type CardExFilter = (typeof CARD_EX_FILTER)[number];
export type CardSortFilter = (typeof CARD_SORT_FILTER)[number];
export type SortDirection = (typeof SORT_DIRECTION)[number];

export const CARD_TYPE_FILTERS = ['pokemon', 'item', 'fossil', 'support', 'tool'] as const;
export const CARD_EX_FILTER = ['none', 'any', 'all'] as const;
export const CARD_SORT_FILTER = ['name', 'id', 'rarity', 'hp', 'color'] as const;
export const SORT_DIRECTION = ['asc', 'desc'] as const;

export const CARD_FILTER_DEFAULTS = {
  set: [] as string[],
  color: [],
  rarity: [],
  minHp: 0,
  maxHp: 210,
  searchQuery: '',
  cardType: [],
  ex: 'any',
  sortBy: 'id',
  sortDirection: 'asc',
} as const;

export const cardFilterParsers = {
  set: parseAsArrayOf(parseAsString).withDefault([...CARD_FILTER_DEFAULTS.set]),
  color: parseAsArrayOf(parseAsStringLiteral([...Constants.public.Enums.color])).withDefault([
    ...CARD_FILTER_DEFAULTS.color,
  ]),
  rarity: parseAsArrayOf(parseAsStringLiteral([...Constants.public.Enums.rarity])).withDefault([
    ...CARD_FILTER_DEFAULTS.rarity,
  ]),
  minHp: parseAsInteger.withDefault(CARD_FILTER_DEFAULTS.minHp),
  maxHp: parseAsInteger.withDefault(CARD_FILTER_DEFAULTS.maxHp),
  cardType: parseAsArrayOf(parseAsStringLiteral(CARD_TYPE_FILTERS)).withDefault([
    ...CARD_FILTER_DEFAULTS.cardType,
  ]),
  ex: parseAsStringLiteral(CARD_EX_FILTER).withDefault(CARD_FILTER_DEFAULTS.ex),
  searchQuery: parseAsString.withDefault(CARD_FILTER_DEFAULTS.searchQuery),
  sortBy: parseAsStringLiteral(CARD_SORT_FILTER).withDefault(CARD_FILTER_DEFAULTS.sortBy),
  sortDirection: parseAsStringLiteral(SORT_DIRECTION).withDefault(
    CARD_FILTER_DEFAULTS.sortDirection,
  ),
};

// Replaces parser keys with keys that are more suitable for the URL
export const cardFilterUrlKeys: UrlKeys<CardFilterParsers> = {
  searchQuery: 'q',
  sortDirection: 'sortDir',
  sortBy: 'sort',
};

export const loadCardSearchParams = createLoader(cardFilterParsers, { urlKeys: cardFilterUrlKeys });
