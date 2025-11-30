'use client';

import { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';

import fetchSetData, { SetsWithPacks } from '@/lib/data-fetching/fetchSetData';
import FilterWrapper from '../FIlterWrapper';
import CheckboxGroup from '@/components/ui/checkbox-group/root/CheckboxGroup';

function SetFilter() {
  const [value, setValue] = useState(new Set<string>());
  const [data, setData] = useState<SetsWithPacks>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  // TODO - Ideally this should be fetched on the server in some parent component
  useEffect(() => {
    fetchSetData().then(res => {
      setError(res.error);
      setData(res.data);
    });
  }, []);

  if (error) return <div className="text-red-400">An error occured: {error.message}</div>;

  return (
    <FilterWrapper label="Set">
      <CheckboxGroup value={value} setValue={setValue}>
        {data &&
          data.map(set => {
            const hasMultiplePacks = set.packs.length > 1;

            if (hasMultiplePacks) {
              return (
                <CheckboxGroup.NestedGroup key={`set-filter-${set.name}`} label={set.name}>
                  {set.packs.map(pack => (
                    <CheckboxGroup.Item key={`set-filter-pack-${pack.symbol}`} value={pack.symbol}>
                      {pack.name}
                    </CheckboxGroup.Item>
                  ))}
                </CheckboxGroup.NestedGroup>
              );
            } else {
              return (
                <CheckboxGroup.Item value={set.packs[0].symbol} key={`set-filter-${set.name}`}>
                  {set.name}
                </CheckboxGroup.Item>
              );
            }
          })}
      </CheckboxGroup>
    </FilterWrapper>
  );
}

export default SetFilter;
