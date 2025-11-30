import { ChevronDownIcon } from 'lucide-react';
import { Select } from 'radix-ui';

type SortFilter = 'name' | 'id' | 'rarity' | 'hp' | 'color';

const sortNamesMap: Record<SortFilter, string> = {
  id: 'Id',
  name: 'Name',
  rarity: 'Rarity',
  color: 'Color',
  hp: 'HP',
};

function SortSelect() {
  return (
    <Select.Root>
      <Select.Trigger className="cursor-pointer h-9 min-w-36 w-full flex items-center py-2 px-3 justify-between rounded-lg bg-bg-2 focus:outline-1 outline-neutral-400">
        <Select.Value placeholder="Sort by:" className="text-text" aria-label="Sorting" />
        <Select.Icon>
          <ChevronDownIcon size={20} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content
        align="start"
        position="popper"
        sideOffset={8}
        className="bg-bg-2 rounded-lg p-1.5 w-(--radix-select-trigger-width)"
      >
        {Object.entries(sortNamesMap).map(([value, displayText]) => (
          <Select.Item
            value={value}
            key={value}
            className="bg-transparent hover:bg-bg-3 py-1 cursor-pointer px-3 outline-none rounded-lg select-none"
          >
            <Select.ItemText>{displayText}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default SortSelect;
