import { useQueryStates } from 'nuqs';
import { useSetAtom } from 'jotai';

import {
  CARD_FILTER_DEFAULTS,
  CardFilterKey,
  cardFilterParsers,
  CardFilterParsers,
  cardFilterUrlKeys,
} from '../config/card-filter-config';
import { cardFilterLoadingAtom } from '../atoms/cardFilterLoadingAtom';
import { CardFilterSetter, CardFilterSetterOptions, CardFilterSetters } from '@/types/filter-state';

// managing all filter state with searchParam synchronization in a custom hook
function useFilterState() {
  const setIsLoading = useSetAtom(cardFilterLoadingAtom);

  const [state, setState] = useQueryStates(cardFilterParsers, {
    urlKeys: cardFilterUrlKeys,
    limitUrlUpdates: { timeMs: 500, method: 'debounce' },
    shallow: false,
  });

  const setStateWithLoading = (
    values: Parameters<typeof setState>[0],
    options?: CardFilterSetterOptions,
  ): ReturnType<typeof setState> => {
    if (!options?.skipLoadingState) setIsLoading(true);

    return setState(values, options);
  };

  // Creating individual setter function for each filter key (with type safety)
  const setters = {} as CardFilterSetters;

  (Object.keys(cardFilterParsers) as Array<keyof CardFilterParsers>).forEach(key => {
    setters[key] = ((value, options) =>
      setStateWithLoading({ [key]: value }, options)) as CardFilterSetter<typeof key>;
  });

  // Helper function
  function isActive<K extends CardFilterKey>(filter: K | K) {
    const parser = cardFilterParsers[filter];
    const currentValue = state[filter];
    const defaultValue = CARD_FILTER_DEFAULTS[filter];

    // TODO - There's probably a way to make this less hacky, this works for now though
    type EqualityFn = (a: (typeof state)[K], b: (typeof CARD_FILTER_DEFAULTS)[K]) => boolean;
    const isDefault = (parser.eq as EqualityFn)(currentValue, defaultValue);

    return !isDefault;
  }

  return { setters, state, setState: setStateWithLoading, isActive };
}

export default useFilterState;
