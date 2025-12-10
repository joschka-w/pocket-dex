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

export type FilterParsers = typeof filterParsers;
export type FilterKey = keyof FilterParsers;
export type FilterState<K extends keyof inferParserType<FilterParsers>> =
  inferParserType<FilterParsers>[K];

export type CardTypeFilter = (typeof CARD_TYPE_FILTERS)[number];
export type ExFilter = (typeof EX_FILTER)[number];
export type SortFilter = (typeof SORT_FILTER)[number];
export type SortDirection = (typeof SORT_DIRECTION)[number];

export const CARD_TYPE_FILTERS = ['pokemon', 'item', 'fossil', 'support', 'tool'] as const;
export const EX_FILTER = ['none', 'any', 'all'] as const;
export const SORT_FILTER = ['name', 'id', 'rarity', 'hp', 'color'] as const;
export const SORT_DIRECTION = ['asc', 'desc'] as const;

export const FILTER_DEFAULTS = {
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

export const filterParsers = {
  set: parseAsArrayOf(parseAsString).withDefault([...FILTER_DEFAULTS.set]),
  color: parseAsArrayOf(parseAsStringLiteral([...Constants.public.Enums.color])).withDefault([
    ...FILTER_DEFAULTS.color,
  ]),
  rarity: parseAsArrayOf(parseAsStringLiteral([...Constants.public.Enums.rarity])).withDefault([
    ...FILTER_DEFAULTS.rarity,
  ]),
  minHp: parseAsInteger.withDefault(FILTER_DEFAULTS.minHp),
  maxHp: parseAsInteger.withDefault(FILTER_DEFAULTS.maxHp),
  cardType: parseAsArrayOf(parseAsStringLiteral(CARD_TYPE_FILTERS)).withDefault([
    ...FILTER_DEFAULTS.cardType,
  ]),
  ex: parseAsStringLiteral(EX_FILTER).withDefault(FILTER_DEFAULTS.ex),
  searchQuery: parseAsString.withDefault(FILTER_DEFAULTS.searchQuery),
  sortBy: parseAsStringLiteral(SORT_FILTER).withDefault(FILTER_DEFAULTS.sortBy),
  sortDirection: parseAsStringLiteral(SORT_DIRECTION).withDefault(FILTER_DEFAULTS.sortDirection),
};

// Replaces parser keys with keys that are more suitable for the URL
export const filterUrlKeys: UrlKeys<FilterParsers> = {
  searchQuery: 'q',
  sortDirection: 'sortDir',
  sortBy: 'sort',
};

export const loadSearchParams = createLoader(filterParsers, { urlKeys: filterUrlKeys });
