import { FilterParsers } from '@/lib/filters/filterConfig';
import { inferParserType, Options } from 'nuqs/server';

export interface FilterValueProps<K extends keyof FilterParsers> {
  value: inferParserType<FilterParsers[K]>;
  setValue: (value: inferParserType<FilterParsers[K]> | null) => Promise<URLSearchParams>;
}

export interface FilterSetterOptions extends Options {
  // won't trigger the loading state if true
  skipLoadingState?: boolean;
}

export type FilterSetter<K extends keyof FilterParsers> = (
  value: inferParserType<FilterParsers[K]> | null,
  options?: FilterSetterOptions
) => Promise<URLSearchParams>;

export type FilterSetters = {
  [K in keyof FilterParsers]: FilterSetter<K>;
};
