import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  label: string;
}

function FilterWrapper({ label, children }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label className="font-semibold text-text-muted">{label}</label>

        <button className="text-text-muted text-sm cursor-pointer hover:underline hover:text-text transition-colors active:text-text-muted">
          Clear
        </button>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}

export default FilterWrapper;
