'use client';

import { Dispatch, SetStateAction } from 'react';
import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import CheckboxGroup from '@/shared/components/ui/checkbox-group/root/CheckboxGroup';
import {
  CARD_TYPE_FILTERS,
  CardTypeFilter as TCardTypeFilter,
  CardFilterState,
} from '@/features/card-catalog/filtering/config/card-filter-config';
import FilterWrapper from '../FilterWrapper';

const cardTypeNamesMap: Record<TCardTypeFilter, string> = {
  fossil: 'Item (Fossil)',
  item: 'Item',
  pokemon: 'Pokemon',
  support: 'Supporter',
  tool: 'Pokemon Tool',
};

function CardTypeFilter() {
  const { state, setters } = useFilterState();

  const stateAsSet = new Set(state.cardType);

  // 'Simulating' a react state-update-function so we can pass it to
  // CheckboxGroup, also to convert the value from a Set to string[]
  const setValue: Dispatch<SetStateAction<Set<string>>> = value => {
    if (typeof value === 'function') {
      const newValue = value(stateAsSet);
      setters.cardType([...newValue] as CardFilterState<'cardType'>);
    } else {
      setters.cardType([...value] as CardFilterState<'cardType'>);
    }
  };

  const trainerCardTypeFilters = CARD_TYPE_FILTERS.filter(val => val !== 'pokemon');

  return (
    <FilterWrapper
      setters={[setters.cardType]}
      label="Card Type"
      clearBtnDisabled={state.cardType.length < 1}
    >
      <CheckboxGroup value={stateAsSet} setValue={setValue}>
        <CheckboxGroup.Item
          value={'pokemon' as TCardTypeFilter['0']}
          key={`card-type-filter-pokemon`}
        >
          {cardTypeNamesMap['pokemon']}
        </CheckboxGroup.Item>
        <CheckboxGroup.NestedGroup label="Trainer" key={'card-type-filter-trainer'}>
          {trainerCardTypeFilters.map(value => {
            return (
              <CheckboxGroup.Item value={value} key={`card-type-filter-${value}`}>
                {cardTypeNamesMap[value]}
              </CheckboxGroup.Item>
            );
          })}
        </CheckboxGroup.NestedGroup>
      </CheckboxGroup>
    </FilterWrapper>
  );
}

export default CardTypeFilter;
