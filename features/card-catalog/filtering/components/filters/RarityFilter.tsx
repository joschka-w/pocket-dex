'use client';

import { ToggleGroup } from 'radix-ui';
import { RARITY_SVG_MAP } from '@/shared/constants/asset-maps';
import Image from 'next/image';
import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import { Enums } from '@/types/database';
import FilterWrapper from '../FilterWrapper';

function RarityFilter() {
  const { state, setters } = useFilterState();

  const handleValueChange = (value: Enums<'rarity'>[]) => {
    setters.rarity(value);
  };

  return (
    <FilterWrapper
      label="Rarity"
      setters={[setters.rarity]}
      clearBtnDisabled={!state.rarity || state.rarity.length < 1}
    >
      <ToggleGroup.Root
        value={state.rarity || []}
        onValueChange={handleValueChange}
        type="multiple"
        className="flex flex-wrap gap-2"
      >
        {Object.entries(RARITY_SVG_MAP).map(([value, img]) => {
          return (
            <ToggleGroup.Item
              key={`color-filter-${value}`}
              value={value}
              className="inset-ring-bg-3 data-[state=on]:bg-primary/10 data-[state=on]:inset-ring-primary h-9 cursor-pointer rounded-full px-4 inset-ring-1 transition-colors hover:bg-white/7"
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
