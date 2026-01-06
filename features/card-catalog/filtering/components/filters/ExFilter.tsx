'use client';

import { ReactNode } from 'react';
import { ToggleGroup } from 'radix-ui';
import { CheckIcon, XIcon } from 'lucide-react';

import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import { cn } from '@/shared/utils/cn';
import {
  ExFilter as ExFilterType,
  FILTER_DEFAULTS,
} from '@/features/card-catalog/filtering/config/filterConfig';
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
        className="flex w-full items-center"
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
        'text-text-muted data-[state=on]:bg-primary data-[state=on]:text-bg-base inset-ring-bg-3 hover:text-text -ml-px flex h-8 grow cursor-pointer items-center justify-center inset-ring-1 transition-colors first:rounded-l-xl last:rounded-r-xl',
        className,
      )}
    >
      {children}
    </ToggleGroup.Item>
  );
}

export default ExFilter;
