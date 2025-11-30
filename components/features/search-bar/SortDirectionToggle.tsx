'use client';

import { SortAsc, SortDesc } from 'lucide-react';
import { ToggleGroup } from 'radix-ui';

function SortDirectionToggle() {
  return (
    <>
      <ToggleGroup.Root
        type="single"
        className="flex h-9 bg-bg-2 rounded-lg w-full overflow-hidden inset-ring-1 inset-ring-bg-3"
      >
        <ToggleGroup.Item
          value="ascending"
          className="aspect-square p-1 flex items-center justify-center cursor-pointer data-[state=on]:bg-primary data-[state=off]:active:text-text-muted data-[state=on]:text-bg-base"
        >
          <SortAsc size={22} />
        </ToggleGroup.Item>

        <ToggleGroup.Item
          value="descending"
          className="aspect-square p-1 flex items-center justify-center cursor-pointer data-[state=on]:bg-primary data-[state=off]:active:text-text-muted data-[state=on]:text-bg-base"
        >
          <SortDesc size={22} />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </>
  );
}

export default SortDirectionToggle;
