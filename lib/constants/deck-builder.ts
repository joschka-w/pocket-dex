import { Enums } from '@/types/database';
import { RarityGroup } from '../utils/calculate-deck-stats';

export const MAX_DECK_SIZE = 20;
export const MAX_SAME_CARD_QUANTITY = 2;
export const MAX_ENERGIES_PER_DECK = 3;

export const CARD_PRICES: Readonly<Record<Enums<'rarity'>, number>> = {
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

export const RARITY_GROUP_LOOKUP_MAP: Readonly<Record<Enums<'rarity'>, RarityGroup | null>> = {
  diamond_1: 'diamond',
  diamond_2: 'diamond',
  diamond_3: 'diamond',
  diamond_4: 'diamond',
  star_1: 'star',
  star_2: 'star',
  star_3: 'star',
  crown: 'crown',
  promo: null,
};
