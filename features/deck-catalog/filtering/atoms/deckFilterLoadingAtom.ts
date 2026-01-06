import { atom } from 'jotai';

// Tracks if filter changes are pending:
// True during debounce period after the user changed a filter, set to false when URL updates
export const deckFilterLoadingAtom = atom(false);
