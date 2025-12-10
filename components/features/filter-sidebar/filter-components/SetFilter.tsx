'use client';

import { Dispatch, SetStateAction } from 'react';

import { SetsWithPacks } from '@/lib/data-fetching/fetchSetData';
import FilterWrapper from '../FilterWrapper';
import CheckboxGroup from '@/components/ui/checkbox-group/root/CheckboxGroup';
import useFilterState from '@/lib/hooks/useFilterState';
import { Collapsible } from 'radix-ui';

interface Props {
  allSets: SetsWithPacks;
  initialVisibleCount?: number;
}

function SetFilter({ allSets, initialVisibleCount = 4 }: Props) {
  const { state, setters } = useFilterState();

  // 'Simulating' a react state-update-function so we can pass it to
  // CheckboxGroup, also to convert the value from a Set to string[]
  const setValue: Dispatch<SetStateAction<Set<string>>> = value => {
    if (typeof value === 'function') {
      const newValue = value(new Set(state.set));
      setters.set([...newValue]);
    } else {
      setters.set([...value]);
    }
  };

  const createItem = (set: NonNullable<SetsWithPacks>[number]) => {
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
    }

    return (
      <CheckboxGroup.Item value={set.packs[0].symbol} key={`set-filter-${set.name}`}>
        {set.name}
      </CheckboxGroup.Item>
    );
  };

  return (
    <FilterWrapper label="Set" setters={[setters.set]} clearBtnDisabled={state.set.length < 1}>
      <CheckboxGroup value={new Set(state.set)} setValue={setValue}>
        {allSets && allSets.slice(0, initialVisibleCount).map(createItem)}
        {allSets && allSets.length > initialVisibleCount && (
          <Collapsible.Root>
            <Collapsible.Content>
              {allSets.slice(initialVisibleCount).map(createItem)}
            </Collapsible.Content>
            <Collapsible.Trigger className="text-text-muted text-sm font-bold group hover:underline cursor-pointer underline-offset-2">
              <span className="group-data-[state=open]:hidden">Show more</span>
              <span className="group-data-[state=closed]:hidden">Show less</span>
            </Collapsible.Trigger>
          </Collapsible.Root>
        )}
      </CheckboxGroup>
    </FilterWrapper>
  );
}

export default SetFilter;
