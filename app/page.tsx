'use client';

import CheckboxGroup from '@/components/ui/checkbox-group/CheckboxGroupRoot';
import { useState } from 'react';

function Home() {
  const [value, setValue] = useState<Set<string>>(new Set());

  console.log(value);

  return (
    <div>
      <CheckboxGroup setValue={setValue} value={value}>
        <CheckboxGroup.Item value="item-1">Item 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="item-2">Item 2</CheckboxGroup.Item>
        <CheckboxGroup.Item value="item-3">Item 3</CheckboxGroup.Item>
      </CheckboxGroup>
    </div>
  );
}

export default Home;
