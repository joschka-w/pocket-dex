'use client';

import { useAtomValue } from 'jotai';

import { currentDeckAtom } from '@/features/deck-management/deck-builder/atoms/deckBuilder';
import calculateDeckStats from '../utils/calculate-deck-stats';

import ColorStats from './ColorStats';
import RarityStats from './RarityStats';
import PriceStats from './PriceStats';
import Seperator from '@/shared/components/ui/Seperator';

function DeckStatistics() {
  const deck = useAtomValue(currentDeckAtom);

  const { colorStats, rarityStats, price } = calculateDeckStats(deck);

  return (
    <div className="bg-bg-1 flex h-32 shrink-0 grow-0 items-center gap-2 rounded-xl px-6 py-4">
      <ColorStats colorStats={colorStats} />
      <Seperator vertical className="bg-bg-3 h-16" />
      <RarityStats rarityStats={rarityStats} />
      <Seperator vertical className="bg-bg-3 h-16" />
      <PriceStats price={price} />
    </div>
  );
}

export default DeckStatistics;
