import { inferParserType, Options, useQueryStates } from 'nuqs';
import { useSetAtom } from 'jotai';

import { filterParsers, FilterParsers, filterUrlKeys } from '../filters/filterConfig';
import { filterLoadingAtom } from '../atoms/filterLoadingAtom';

export interface FilterValueProps<K extends keyof FilterParsers> {
  value: inferParserType<FilterParsers[K]>;
  setValue: (value: inferParserType<FilterParsers[K]> | null) => Promise<URLSearchParams>;
}

interface FilterSetterOptions extends Options {
  // won't trigger the loading state if true
  skipLoadingState?: boolean;
}

type FilterSetter<K extends keyof FilterParsers> = (
  value: inferParserType<FilterParsers[K]> | null,
  options?: FilterSetterOptions
) => Promise<URLSearchParams>;

export type FilterSetters = {
  [K in keyof FilterParsers]: FilterSetter<K>;
};

// managing all filter state with searchParam synchronization in a custom hook
function useFilterState() {
  const setIsLoading = useSetAtom(filterLoadingAtom);

  const [state, setState] = useQueryStates(filterParsers, {
    urlKeys: filterUrlKeys,
    limitUrlUpdates: { timeMs: 500, method: 'debounce' },
    shallow: false,
  });

  const setStateWithLoading = (
    set: Parameters<typeof setState>[0],
    options?: FilterSetterOptions
  ): ReturnType<typeof setState> => {
    if (!options?.skipLoadingState) setIsLoading(true);

    return setState(set, options);
  };

  // Creating individual setter function for each filter key (with type safety)
  const setters = {} as FilterSetters;

  (Object.keys(filterParsers) as Array<keyof FilterParsers>).forEach(key => {
    setters[key] = ((value, options) =>
      setStateWithLoading({ [key]: value }, options)) as FilterSetter<typeof key>;
  });

  return { setters, state, setState: setStateWithLoading };
}

export default useFilterState;
