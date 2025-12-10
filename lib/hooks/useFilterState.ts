import { useQueryStates } from 'nuqs';
import { useSetAtom } from 'jotai';

import {
  FILTER_DEFAULTS,
  FilterKey,
  filterParsers,
  FilterParsers,
  filterUrlKeys,
} from '../filters/filterConfig';
import { filterLoadingAtom } from '../atoms/filterLoadingAtom';
import { FilterSetter, FilterSetterOptions, FilterSetters } from '@/types/filter-state';

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

  // Helper function
  function isActive<K extends FilterKey>(filter: K | K) {
    const parser = filterParsers[filter];
    const currentValue = state[filter];
    const defaultValue = FILTER_DEFAULTS[filter];

    // TODO - There's probably a way to make this less hacky, this works for now though
    type EqualityFn = (a: (typeof state)[K], b: (typeof FILTER_DEFAULTS)[K]) => boolean;
    const isDefault = (parser.eq as EqualityFn)(currentValue, defaultValue);

    return !isDefault;
  }

  return { setters, state, setState: setStateWithLoading, isActive };
}

export default useFilterState;
