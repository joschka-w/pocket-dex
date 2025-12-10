import { CardWithQuantity, Deck } from '../atoms/deckBuilder';
import { MAX_DECK_SIZE, MAX_SAME_CARD_QUANTITY } from '../constants/deck-builder';

export const getDeckSize = (deck: Deck) => {
  return Array.from(deck.values()).reduce((sum, card) => sum + card.quantity, 0);
};

export const validateDeckSize = (deck: Deck) => {
  const deckSize = getDeckSize(deck);

  if (deckSize >= MAX_DECK_SIZE) {
    throw new Error(`Deck is full (${MAX_DECK_SIZE} cards max)`);
  }
};

export const validateCardQuantity = (card: CardWithQuantity | undefined) => {
  if (card && card.quantity >= MAX_SAME_CARD_QUANTITY) {
    throw new Error(`There's already ${MAX_SAME_CARD_QUANTITY} copies of this card in your deck.`);
  }
};
