import { Enums } from '@/types/database';
import { CardWithQuantity, Deck } from '../atoms/deckBuilder';
import { CARD_PRICES, RARITY_GROUP_LOOKUP_MAP } from '../constants/deck-builder';

export type RarityGroup = 'diamond' | 'star' | 'crown';
export type ColorStats = Map<Enums<'color'>, number>;
export type RarityStats = Map<RarityGroup, number>;

const getRarityGroup = (rarity: Enums<'rarity'>): RarityGroup | null => {
  return RARITY_GROUP_LOOKUP_MAP[rarity] || null;
};

function calcColorStats(cards: CardWithQuantity[]) {
  const map: ColorStats = new Map();

  cards.forEach(card => {
    if (!card.pokemon_card?.type) return;

    const currentAmount = map.get(card.pokemon_card.type) || 0;
    map.set(card.pokemon_card.type, currentAmount + card.quantity);
  });

  return map;
}

function calcRarityStats(cards: CardWithQuantity[]) {
  // Initializing map so we have the correct order
  const map: RarityStats = new Map();

  cards.forEach(card => {
    const rarityGroup = getRarityGroup(card.rarity);
    if (!rarityGroup) return;

    const currentAmount = map.get(rarityGroup) || 0;
    map.set(rarityGroup, currentAmount + card.quantity);
  });

  return map;
}

export function calcDeckPrice(cards: Pick<CardWithQuantity, 'quantity' | 'rarity'>[]) {
  return cards.reduce((sum, card) => sum + CARD_PRICES[card.rarity] * card.quantity, 0);
}

function calculateDeckStats(deck: Deck) {
  const cards = Array.from(deck.values());

  return {
    colorStats: calcColorStats(cards),
    rarityStats: calcRarityStats(cards),
    price: calcDeckPrice(cards),
  };
}

export default calculateDeckStats;
