import { useAtom } from 'jotai';

import { currentDeckAtom } from '../atoms/deckBuilder';
import { Tables } from '@/types/database';
import { getDeckSize, validateCardQuantity, validateDeckSize } from '../utils/deck-builder';
import { MAX_DECK_SIZE, MAX_SAME_CARD_QUANTITY } from '../constants/deck-builder';
import toast from 'react-hot-toast';

export function useDeck() {
  const [deck, setDeck] = useAtom(currentDeckAtom);

  const deckSize = getDeckSize(deck);

  const addCard = (card: Tables<'card_view_new'>) => {
    setDeck(prevDeck => {
      const newDeck = new Map(prevDeck);
      const existingCard = newDeck.get(card.id!);

      try {
        validateDeckSize(newDeck);
        validateCardQuantity(existingCard);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message, { id: error.message });
        }

        return newDeck;
      }

      if (existingCard) {
        const newCard = { ...existingCard, quantity: existingCard.quantity + 1 };
        newDeck.set(newCard.id!, newCard);
      } else {
        newDeck.set(card.id!, { ...card, quantity: 1 });
      }

      return newDeck;
    });
  };

  const removeCard = (cardId: string) => {
    setDeck(prevDeck => {
      const newDeck = new Map(prevDeck);
      const card = newDeck.get(cardId);

      if (!card) return newDeck;

      const newQuantity = card.quantity - 1;

      if (newQuantity <= 0) {
        newDeck.delete(cardId);
      } else {
        const newCard = { ...card, quantity: newQuantity };
        newDeck.set(cardId, newCard);
      }

      return newDeck;
    });
  };

  // Helper functions
  const canCardBeAdded = (cardId: string) => {
    const card = deck.get(cardId);
    const deckSize = getDeckSize(deck);

    if (deckSize >= MAX_DECK_SIZE) return false;
    return !card || card.quantity < MAX_SAME_CARD_QUANTITY;
  };

  const resetDeck = () => setDeck(new Map());
  const isCardInDeck = (cardId: string) => deck.has(cardId);
  const getCardQuantity = (cardId: string) => deck.get(cardId)?.quantity || 0;

  return {
    deck,
    addCard,
    removeCard,
    resetDeck,
    isCardInDeck,
    getCardQuantity,
    canCardBeAdded,
    deckSize,
  };
}
