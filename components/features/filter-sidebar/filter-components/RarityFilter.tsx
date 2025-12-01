'use client';

import { ToggleGroup } from 'radix-ui';
import FilterWrapper from '../FilterWrapper';
import { raritySVGs } from '@/lib/constants/asset-maps';
import Image from 'next/image';
import useFilterState from '@/lib/hooks/useFilterState';
import { Enums } from '@/types/database';

function RarityFilter() {
  const { state, setters } = useFilterState();

  const handleValueChange = (value: Enums<'rarity'>[]) => {
    setters.rarity(value.length === 0 ? null : value);
  };

  return (
    <FilterWrapper label="Rarity" setters={[setters.rarity]}>
      <ToggleGroup.Root
        value={state.rarity || []}
        onValueChange={handleValueChange}
        type="multiple"
        className="flex gap-2 flex-wrap"
      >
        {Object.entries(raritySVGs).map(([value, img]) => {
          return (
            <ToggleGroup.Item
              key={`color-filter-${value}`}
              value={value}
              className="rounded-full cursor-pointer h-9 inset-ring-1 inset-ring-bg-3 px-4 hover:bg-white/7 transition-colors data-[state=on]:bg-primary/10 data-[state=on]:inset-ring-primary"
            >
              <Image src={img} alt={value} />
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </FilterWrapper>
  );
}

export default RarityFilter;
