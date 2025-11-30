'use client';

import CheckboxGroup from '@/components/ui/checkbox-group/CheckboxGroup';
import { useState } from 'react';

function Home() {
  const [value, setValue] = useState<Set<string>>(new Set());

  return (
    <div>
      <CheckboxGroup setValue={setValue} value={value} className="w-60">
        <CheckboxGroup.NestedGroup label="Group">
          <CheckboxGroup.Item value="item-1">Item 1</CheckboxGroup.Item>
          <CheckboxGroup.Item value="item-2">Item 2</CheckboxGroup.Item>
        </CheckboxGroup.NestedGroup>

        <CheckboxGroup.NestedGroup label="Other Group">
          <CheckboxGroup.Item value="item-3">Item 3</CheckboxGroup.Item>
          <CheckboxGroup.Item value="item-4">Item 4</CheckboxGroup.Item>
          <CheckboxGroup.Item value="item-5">Item 5</CheckboxGroup.Item>
        </CheckboxGroup.NestedGroup>

        <CheckboxGroup.Item value="item-6">Item 6</CheckboxGroup.Item>
      </CheckboxGroup>
    </div>
  );
}

export default Home;
