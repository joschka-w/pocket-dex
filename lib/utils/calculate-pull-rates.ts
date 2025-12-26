import { Enums } from '@/types/database';
import { fetchCardCountPerPack } from '../data/fetchCardCountPerPack';
import { PULL_RATES } from '../constants/pull-rates';

const calcSingleRate = (
  rarity: Exclude<Enums<'rarity'>, 'promo'>,
  rateType: keyof typeof PULL_RATES,
  cardCount: Record<Exclude<Enums<'rarity'>, 'promo'>, number>,
) => {
  const rates = PULL_RATES[rateType];

  return rates[rarity] * (1 / cardCount[rarity]);
};

export async function calculatePullRates(rarity: Enums<'rarity'>, packId: number) {
  const { data: cardCount, error } = await fetchCardCountPerPack(packId);

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  if (rarity === 'promo') {
    return {
      data: null,
      error: `Card rarity '${rarity}' can not have pull rates.`,
    };
  }

  const rate1to3 = calcSingleRate(rarity, '1-3', cardCount);
  const rate4 = calcSingleRate(rarity, '4', cardCount);
  const rate5 = calcSingleRate(rarity, '5', cardCount);

  return {
    data: {
      '1-3': rate1to3,
      '4': rate4,
      '5': rate5,
      all: rate1to3 * 3 + rate4 + rate5,
    },
    error: null,
  };
}
