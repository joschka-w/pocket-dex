'use client';

import { SortAsc, SortDesc } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useState } from 'react';

type SortDirection = 'ascending' | 'descending';

function SortDirectionToggle() {
  const [value, setValue] = useState<SortDirection>('ascending');

  const handleValueChange = (val: SortDirection) => {
    // Only update the value if it is not an empty string, that way we
    // ensure that one state is always active: either ascending or descending
    if (val) setValue(val);
  };

  return (
    <>
      <ToggleGroup size={'sm'} value={value} onValueChange={handleValueChange} type="single">
        <ToggleGroupItem
          value="ascending"
          className="bg-bg-2 hover:bg-bg-3 hover:text-text data-[state=off]:text-text-muted px-2 data-[state=on]:bg-primary outline-1 ring-1 ring-bg-3"
        >
          <SortAsc size={22} />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="descending"
          className="bg-bg-2 hover:bg-bg-3 hover:text-text data-[state=off]:text-text-muted px-2 data-[state=on]:bg-primary outline-1 ring-1 ring-bg-3"
        >
          <SortDesc size={22} />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}

export default SortDirectionToggle;
