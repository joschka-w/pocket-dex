'use client';

import { ReactNode } from 'react';
import { ToggleGroup } from 'radix-ui';
import { CheckIcon, XIcon } from 'lucide-react';

import useFilterState from '@/lib/hooks/useFilterState';
import { cn } from '@/lib/utils/cn';
import { ExFilter as ExFilterType, FILTER_DEFAULTS } from '@/lib/filters/filterConfig';
import FilterWrapper from '../FilterWrapper';

function ExFilter() {
  const { state, setters } = useFilterState();

  const handleValueChange = (value: ExFilterType) => {
    if (value) setters.ex(value);
  };

  return (
    <FilterWrapper
      label="EX Pokemon?"
      setters={[setters.ex]}
      clearBtnDisabled={state.ex === FILTER_DEFAULTS.ex}
    >
      <ToggleGroup.Root
        value={state.ex}
        onValueChange={handleValueChange}
        type="single"
        className="flex items-center w-full"
      >
        <Item value={'none'}>
          <XIcon strokeWidth={3} />
        </Item>
        <Item value={'any'} className="font-semibold">
          Any
        </Item>
        <Item value={'all'}>
          <CheckIcon strokeWidth={3} />
        </Item>
      </ToggleGroup.Root>
    </FilterWrapper>
  );
}

interface ItemProps {
  value: ExFilterType;
  className?: string;
  children?: ReactNode;
}

function Item({ value, className, children }: ItemProps) {
  return (
    <ToggleGroup.Item
      value={value}
      className={cn(
        'grow flex items-center text-text-muted justify-center data-[state=on]:bg-primary data-[state=on]:text-bg-base first:rounded-l-xl last:rounded-r-xl cursor-pointer h-8 -ml-px inset-ring-1 inset-ring-bg-3 hover:text-text transition-colors',
        className
      )}
    >
      {children}
    </ToggleGroup.Item>
  );
}

export default ExFilter;
