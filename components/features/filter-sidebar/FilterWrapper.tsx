'use client';

import { FilterSetters } from '@/lib/hooks/useFilterState';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  label: string;
  setters: FilterSetters[keyof FilterSetters][];
}

function FilterWrapper({ label, setters, children }: Props) {
  const handleClick = () => setters.forEach(setter => setter(null));

  return (
    <div>
      <div className="flex justify-between items-center">
        <label className="font-semibold text-text-muted">{label}</label>

        <button
          onClick={handleClick}
          className="text-text-muted text-sm cursor-pointer hover:underline hover:text-text transition-colors active:text-text-muted"
        >
          Clear
        </button>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}

export default FilterWrapper;
