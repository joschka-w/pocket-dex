import { inferParserType, useQueryStates } from 'nuqs';
import {
  DeckFilterParsers,
  deckFilterParsers,
  deckFilterUrlKeys,
} from '../config/deck-filter-config';
import { Options } from 'nuqs/server';
import { useSetAtom } from 'jotai';
import { deckFilterLoadingAtom } from '../atoms/deckFilterLoadingAtom';

interface DeckFilterSetterOptions extends Options {
  // won't trigger the loading state if true
  skipLoadingState?: boolean;
}

type DeckFilterSetter<K extends keyof DeckFilterParsers> = (
  value: inferParserType<DeckFilterParsers[K]> | null,
  options?: DeckFilterSetterOptions,
) => Promise<URLSearchParams>;

type DeckFilterSetters = {
  [K in keyof DeckFilterParsers]: DeckFilterSetter<K>;
};

export function useDeckFilterState() {
  const setDecksLoading = useSetAtom(deckFilterLoadingAtom);

  const [state, setState] = useQueryStates(deckFilterParsers, {
    urlKeys: deckFilterUrlKeys,
    limitUrlUpdates: { timeMs: 500, method: 'debounce' },
    shallow: false,
  });

  const setStateWithLoading: typeof setState = (...args) => {
    setDecksLoading(true);

    return setState(...args);
  };

  // Creating individual setter function for each filter key (with type safety)
  const setters = {} as DeckFilterSetters;

  (Object.keys(deckFilterParsers) as Array<keyof DeckFilterParsers>).forEach(key => {
    setters[key] = ((value, options) =>
      setStateWithLoading({ [key]: value }, options)) as DeckFilterSetter<typeof key>;
  });

  return { setters, state, setState: setStateWithLoading };
}
