'use client';

import Image from 'next/image';
import { ToggleGroup } from 'radix-ui';

import { Enums } from '@/types/database';
import { COLOR_SVG_MAP } from '@/shared/constants/asset-maps';
import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import { cn } from '@/shared/utils/cn';
import FilterWrapper from '../FilterWrapper';

function ColorFilter() {
  const { state, setters } = useFilterState();

  const handleValueChange = (value: Enums<'color'>[]) => {
    setters.color(value);
  };

  const anySelected = (state.color && state.color.length > 0) || undefined;

  return (
    <FilterWrapper label="Color" setters={[setters.color]} clearBtnDisabled={!anySelected}>
      <ToggleGroup.Root
        value={state.color || []}
        onValueChange={handleValueChange}
        type="multiple"
        className="flex flex-wrap gap-2"
      >
        {Object.entries(COLOR_SVG_MAP).map(([value, img]) => {
          return (
            <ToggleGroup.Item
              key={`color-filter-${value}`}
              value={value}
              data-any-selected={anySelected}
              className={cn(
                'relative aspect-square w-7 cursor-pointer rounded-full data-[state=on]:scale-110 data-[state=on]:ring-2',
                "after:absolute after:inset-0 after:rounded-full after:transition-colors after:duration-100 after:content-[''] data-any-selected:data-[state=off]:after:bg-black/40",
              )}
            >
              <Image src={img} alt={value} />
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </FilterWrapper>
  );
}

export default ColorFilter;
