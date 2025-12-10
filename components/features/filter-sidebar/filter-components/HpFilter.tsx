'use client';

import { Slider } from 'radix-ui';
import FilterWrapper from '../FilterWrapper';
import useFilterState from '@/lib/hooks/useFilterState';
import { FILTER_DEFAULTS } from '@/lib/filters/filterConfig';

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
        className="relative flex h-5 w-full touch-none select-none items-center"
        defaultValue={[min, max]}
        min={min}
        max={max}
        step={10}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="relative h-1 grow rounded-full bg-bg-3">
          <Slider.Range className="absolute h-full bg-primary/75" />
        </Slider.Track>
        <Slider.Thumb
          className="block size-4 cursor-pointer rounded-full bg-primary hover:bg-primary-light focus:ring-2 hover:scale-120 transition-all duration-75 focus:outline-none"
          aria-label="Minimum Hp"
        />
        <Slider.Thumb
          className="block size-4 cursor-pointer rounded-full bg-primary hover:bg-primary-light focus:ring-2 hover:scale-120 transition-all duration-75 focus:outline-none"
          aria-label="Maximum Hp"
        />
      </Slider.Root>
      <div className="w-full mt-1.5 flex justify-between text-sm font-medium text-text-muted">
        <span>{value[0]}</span>
        <span>{value[1]}</span>
      </div>
    </FilterWrapper>
  );
}

export default HpFilter;
