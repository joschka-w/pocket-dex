'use client';

import { FilterSetters } from '@/lib/hooks/useFilterState';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  label: string;
  setters: FilterSetters[keyof FilterSetters][];
  clearBtnDisabled?: boolean;
}

function FilterWrapper({ label, setters, clearBtnDisabled = false, children }: Props) {
  const handleClick = () => setters.forEach(setter => setter(null));

  return (
    <div>
      <div className="flex justify-between items-center">
        <label className="font-semibold text-text-muted">{label}</label>

        <button
          disabled={clearBtnDisabled}
          onClick={handleClick}
          className="text-text-muted text-sm not-disabled:cursor-pointer not-disabled:hover:underline hover:text-text transition-colors disabled:text-text-muted/50 active:text-text-muted"
        >
          Clear
        </button>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}

export default FilterWrapper;
