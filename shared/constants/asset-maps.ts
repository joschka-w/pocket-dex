import diamond_1 from '@/assets/rarity/diamond_1.svg';
import diamond_2 from '@/assets/rarity/diamond_2.svg';
import diamond_3 from '@/assets/rarity/diamond_3.svg';
import diamond_4 from '@/assets/rarity/diamond_4.svg';
import star_1 from '@/assets/rarity/star_1.svg';
import star_2 from '@/assets/rarity/star_2.svg';
import star_3 from '@/assets/rarity/star_3.svg';
import crown from '@/assets/rarity/crown.svg';

import grass from '@/assets/colors/grass.png';
import fire from '@/assets/colors/fire.png';
import water from '@/assets/colors/water.png';
import lightning from '@/assets/colors/lightning.png';
import psychic from '@/assets/colors/psychic.png';
import fighting from '@/assets/colors/fighting.png';
import darkness from '@/assets/colors/darkness.png';
import metal from '@/assets/colors/metal.png';
import dragon from '@/assets/colors/dragon.png';
import colorless from '@/assets/colors/colorless.png';

export const RARITY_SVG_MAP = {
  diamond_1,
  diamond_2,
  diamond_3,
  diamond_4,
  star_1,
  star_2,
  star_3,
  crown,
};

export const getRarityImg = (rarity: keyof typeof RARITY_SVG_MAP) => RARITY_SVG_MAP[rarity];

export const COLOR_SVG_MAP = {
  grass,
  fire,
  water,
  lightning,
  psychic,
  fighting,
  darkness,
  metal,
  dragon,
  colorless,
};

export const getColorImg = (color: keyof typeof COLOR_SVG_MAP) => COLOR_SVG_MAP[color];
