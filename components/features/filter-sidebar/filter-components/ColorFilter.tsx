import { ToggleGroup } from 'radix-ui';
import FilterWrapper from '../FIlterWrapper';
import { colorSVGs } from '@/lib/constants/asset-maps';
import Image from 'next/image';

function ColorFilter() {
  return (
    <FilterWrapper label="Color">
      <ToggleGroup.Root type="multiple" className="flex gap-2 flex-wrap">
        {Object.entries(colorSVGs).map(([value, img]) => {
          return (
            <ToggleGroup.Item
              key={`color-filter-${value}`}
              value={value}
              className="rounded-full data-[state=on]:ring-2 w-7 aspect-square cursor-pointer data-[state=on]:scale-110"
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
