import { Tables } from '@/types/database';
import { atomWithStorage } from 'jotai/utils';

export interface CardWithQuantity extends Tables<'card_view_new'> {
  quantity: number;
}

export type Deck = Map<string, CardWithQuantity>; // Maps cardId -> CardWithQuantity

// TODO - Add privacy notice, something like:
// "To improve your experience, this site saves your unfinished deck locally in your browser.
// This data is not sent to our servers and is automatically deleted if you clear your browser's site data."

export const currentDeckAtom = atomWithStorage<Deck>('currentDeck', new Map(), {
  getItem(key, initialValue) {
    const item = localStorage.getItem(key);
    if (item === null) return initialValue;

    try {
      const parsed = JSON.parse(item);
      return new Map(parsed) as Deck;
    } catch (error) {
      console.error('Error parsing current deck from localStorage:', error);
      return initialValue;
    }
  },
  setItem(key, newValue) {
    try {
      const serializable = Array.from(newValue.entries());
      localStorage.setItem(key, JSON.stringify(serializable));
    } catch (error) {
      console.error('Error saving deck to localStorage:', error);
    }
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
});
