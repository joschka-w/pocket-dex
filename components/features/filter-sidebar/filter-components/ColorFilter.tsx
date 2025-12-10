'use client';

import Image from 'next/image';
import { ToggleGroup } from 'radix-ui';

import { Enums } from '@/types/database';
import { colorSVGs } from '@/lib/constants/asset-maps';
import useFilterState from '@/lib/hooks/useFilterState';
import FilterWrapper from '../FilterWrapper';
import { cn } from '@/lib/utils/cn';

function ColorFilter() {
  const { state, setters } = useFilterState();

  const handleValueChange = (value: Enums<'color'>[]) => {
    setters.color(value.length === 0 ? null : value);
  };

  const anySelected = (state.color && state.color.length > 0) || undefined;

  return (
    <FilterWrapper label="Color" setters={[setters.color]} clearBtnDisabled={!anySelected}>
      <ToggleGroup.Root
        value={state.color || []}
        onValueChange={handleValueChange}
        type="multiple"
        className="flex gap-2 flex-wrap"
      >
        {Object.entries(colorSVGs).map(([value, img]) => {
          return (
            <ToggleGroup.Item
              key={`color-filter-${value}`}
              value={value}
              data-any-selected={anySelected}
              className={cn(
                'rounded-full data-[state=on]:ring-2 w-7 relative aspect-square cursor-pointer data-[state=on]:scale-110',
                "after:content-[''] data-any-selected:data-[state=off]:after:bg-black/40 after:transition-colors after:duration-100 after:inset-0 after:rounded-full after:absolute"
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
