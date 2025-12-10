import { Enums } from '@/types/database';

export const MAX_DECK_SIZE = 20;
export const MAX_SAME_CARD_QUANTITY = 2;
export const MAX_ENERGIES_PER_DECK = 3;

export const cardPrices: Record<Enums<'rarity'>, number> = {
  diamond_1: 35,
  diamond_2: 70,
  diamond_3: 150,
  diamond_4: 500,
  star_1: 400,
  star_2: 1250,
  star_3: 1500,
  crown: 2500,
  promo: 0,
};
