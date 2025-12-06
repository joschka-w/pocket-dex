import { inferParserType, Options, useQueryStates } from 'nuqs';
import { useSetAtom } from 'jotai';

import { filterParsers, FilterParsers, filterUrlKeys } from '../filters/filterConfig';
import { filterLoadingAtom } from '../atoms/filterLoadingAtom';

export interface FilterValueProps<K extends keyof FilterParsers> {
  value: inferParserType<FilterParsers[K]>;
  setValue: (value: inferParserType<FilterParsers[K]> | null) => Promise<URLSearchParams>;
}

export type FilterSetters = {
  [K in keyof FilterParsers]: (
    value: inferParserType<FilterParsers[K]> | null,
    options?: Options
  ) => Promise<URLSearchParams>;
};

// managing all filter state with searchParam synchronization in a custom hook
function useFilterState() {
  const setIsLoading = useSetAtom(filterLoadingAtom);

  const [state, setState] = useQueryStates(filterParsers, {
    urlKeys: filterUrlKeys,
    limitUrlUpdates: { timeMs: 500, method: 'debounce' },
    shallow: false,
  });

  const mySetState: typeof setState = (...args) => {
    setIsLoading(true);
    return setState(...args);
  };

  // Creating individual setter function for each filter key (with type safety)
  const setters = {} as FilterSetters;

  (Object.keys(filterParsers) as Array<keyof FilterParsers>).forEach(key => {
    setters[key] = (value: inferParserType<FilterParsers[typeof key]> | null, options?: Options) =>
      mySetState({ [key]: value }, options);
  });

  return { setters, state, setState: mySetState };
}

export default useFilterState;
