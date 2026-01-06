'use client';

import { CardFilterSetters } from '@/types/filter-state';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  label: string;
  setters: CardFilterSetters[keyof CardFilterSetters][];
  clearBtnDisabled?: boolean;
}

function FilterWrapper({ label, setters, clearBtnDisabled = false, children }: Props) {
  const handleClick = () => setters.forEach(setter => setter(null));

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-text-muted font-semibold">{label}</label>

        <button
          disabled={clearBtnDisabled}
          onClick={handleClick}
          className="text-text-muted hover:text-text active:text-text-muted cursor-pointer text-sm transition-colors hover:underline disabled:hidden"
        >
          Clear
        </button>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}

export default FilterWrapper;
