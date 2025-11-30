'use client';

import { Slider } from 'radix-ui';
import FilterWrapper from '../FIlterWrapper';
import { useState } from 'react';

interface Props {
  max: number;
  min: number;
}

function HpFilter({ min, max }: Props) {
  const [value, setValue] = useState([min, max]);

  const handleValueChange = (val: number[]) => {
    setValue(val);
  };

  return (
    <FilterWrapper label="HP">
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
