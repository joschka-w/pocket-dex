'use client';

import { Slider } from 'radix-ui';
import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import { FILTER_DEFAULTS } from '@/features/card-catalog/filtering/config/filterConfig';
import FilterWrapper from '../FilterWrapper';

interface Props {
  max: number;
  min: number;
}

function HpFilter({ min, max }: Props) {
  const { state, setters } = useFilterState();

  const value = [state.minHp, state.maxHp];
  const isDefaultState =
    state.minHp === FILTER_DEFAULTS.minHp && state.maxHp === FILTER_DEFAULTS.maxHp;

  const handleValueChange = (values: number[]) => {
    setters.minHp(values[0]);
    setters.maxHp(values[1]);
  };

  return (
    <FilterWrapper
      label="HP"
      setters={[setters.minHp, setters.maxHp]}
      clearBtnDisabled={isDefaultState}
    >
      <Slider.Root
        value={value}
        onValueChange={handleValueChange}
        className="relative flex h-5 w-full touch-none items-center select-none"
        defaultValue={[min, max]}
        min={min}
        max={max}
        step={10}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="bg-bg-3 relative h-1 grow rounded-full">
          <Slider.Range className="bg-primary/75 absolute h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="bg-primary hover:bg-primary-light block size-4 cursor-pointer rounded-full transition-all duration-75 hover:scale-120 focus:ring-2 focus:outline-none"
          aria-label="Minimum Hp"
        />
        <Slider.Thumb
          className="bg-primary hover:bg-primary-light block size-4 cursor-pointer rounded-full transition-all duration-75 hover:scale-120 focus:ring-2 focus:outline-none"
          aria-label="Maximum Hp"
        />
      </Slider.Root>
      <div className="text-text-muted mt-1.5 flex w-full justify-between text-sm font-medium">
        <span>{value[0]}</span>
        <span>{value[1]}</span>
      </div>
    </FilterWrapper>
  );
}

export default HpFilter;
