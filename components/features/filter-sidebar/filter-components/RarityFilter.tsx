import { ToggleGroup } from 'radix-ui';
import FilterWrapper from '../FIlterWrapper';
import { raritySVGs } from '@/lib/constants/asset-maps';
import Image from 'next/image';

function RarityFilter() {
  return (
    <FilterWrapper label="Rarity">
      <ToggleGroup.Root type="multiple" className="flex gap-2 flex-wrap">
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
