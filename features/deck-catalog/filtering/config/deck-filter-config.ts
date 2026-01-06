import { SORT_DIRECTION } from '@/features/card-catalog/filtering/config/card-filter-config';
import {
  createLoader,
  inferParserType,
  parseAsString,
  parseAsStringLiteral,
  UrlKeys,
} from 'nuqs/server';

export type DeckFilterParsers = typeof deckFilterParsers;
export type DeckFilterKey = keyof DeckFilterParsers;
export type DeckFilterState<K extends keyof inferParserType<DeckFilterParsers>> =
  inferParserType<DeckFilterParsers>[K];

export type DeckSortFilter = (typeof DECK_SORT_FILTER)[number];

export const DECK_SORT_FILTER = ['favorites', 'date'] as const;

export const DECK_FILTER_DEFAULTS = {
  sortBy: 'favorites',
  sortDirection: 'desc',
  searchQuery: '',
} as const;

export const deckFilterParsers = {
  searchQuery: parseAsString.withDefault(DECK_FILTER_DEFAULTS.searchQuery),
  sortBy: parseAsStringLiteral(DECK_SORT_FILTER).withDefault(DECK_FILTER_DEFAULTS.sortBy),
  sortDirection: parseAsStringLiteral(SORT_DIRECTION).withDefault(
    DECK_FILTER_DEFAULTS.sortDirection,
  ),
};

// Replaces parser keys with keys that are more suitable for the URL
export const deckFilterUrlKeys: UrlKeys<DeckFilterParsers> = {
  searchQuery: 'q',
  sortBy: 'sort',
  sortDirection: 'sortDir',
};

export const loadDeckSearchParams = createLoader(deckFilterParsers, { urlKeys: deckFilterUrlKeys });
