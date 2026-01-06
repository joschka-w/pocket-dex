import { CardFilterParsers } from '@/features/card-catalog/filtering/config/card-filter-config';
import { inferParserType, Options } from 'nuqs/server';

export interface CardFilterValueProps<K extends keyof CardFilterParsers> {
  value: inferParserType<CardFilterParsers[K]>;
  setValue: (value: inferParserType<CardFilterParsers[K]> | null) => Promise<URLSearchParams>;
}
export interface CardFilterSetterOptions extends Options {
  // TODO - I dont think this is used anywhere, can probably remove this? doesn't hurt though
  skipLoadingState?: boolean; // won't trigger the loading state if true
}

export type CardFilterSetter<K extends keyof CardFilterParsers> = (
  value: inferParserType<CardFilterParsers[K]> | null,
  options?: CardFilterSetterOptions,
) => Promise<URLSearchParams>;

export type CardFilterSetters = {
  [K in keyof CardFilterParsers]: CardFilterSetter<K>;
};
