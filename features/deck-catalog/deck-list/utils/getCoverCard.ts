import { getCardPrice } from '@/features/deck-management/deck-builder/constants/deck-builder';
import { DeckResult } from '../api/fetchDecks';

export function getDeckCoverCard({ cards }: DeckResult) {
  return cards.sort((a, b) => getCardPrice(b.card.rarity) - getCardPrice(a.card.rarity))[0].card;
}
