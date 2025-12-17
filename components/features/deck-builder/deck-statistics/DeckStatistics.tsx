'use client';

import { useAtomValue } from 'jotai';

import { currentDeckAtom } from '@/lib/atoms/deckBuilder';
import calculateDeckStats from '@/lib/utils/calculate-deck-stats';

import ColorStats from './ColorStats';
import RarityStats from './RarityStats';
import PriceStats from './PriceStats';
import Seperator from '@/components/ui/Seperator';

function DeckStatistics() {
  const deck = useAtomValue(currentDeckAtom);

  const { colorStats, rarityStats, price } = calculateDeckStats(deck);

  return (
    <div className="flex items-center bg-bg-1 rounded-xl py-4 h-32 grow-0 shrink-0 px-6 gap-2">
      <ColorStats colorStats={colorStats} />
      <Seperator vertical className="bg-bg-3 h-16" />
      <RarityStats rarityStats={rarityStats} />
      <Seperator vertical className="bg-bg-3 h-16" />
      <PriceStats price={price} />
    </div>
  );
}

export default DeckStatistics;
