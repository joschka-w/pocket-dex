import { inferParserType, useQueryStates } from 'nuqs';
import { filterParsers, FilterParsers, filterUrlKeys } from '../filters/filterConfig';

export interface FilterValueProps<K extends keyof FilterParsers> {
  value: inferParserType<FilterParsers[K]>;
  setValue: (value: inferParserType<FilterParsers[K]> | null) => Promise<URLSearchParams>;
}

export type FilterSetters = {
  [K in keyof FilterParsers]: (
    value: inferParserType<FilterParsers[K]> | null
  ) => Promise<URLSearchParams>;
};

// managing all filter state with searchParam synchronization in a custom hook
function useFilterState() {
  const [state, setState] = useQueryStates(filterParsers, {
    limitUrlUpdates: { timeMs: 1000, method: 'debounce' },
    shallow: false,
    urlKeys: filterUrlKeys,
  });

  // Creating individual setter function for each filter key (with type safety)
  const setters = {} as FilterSetters;

  (Object.keys(filterParsers) as Array<keyof FilterParsers>).forEach(key => {
    setters[key] = (value: inferParserType<FilterParsers[typeof key]> | null) =>
      setState({ [key]: value });
  });

  return { setters, state, setState };
}

export default useFilterState;
