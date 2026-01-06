'use client';

import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

import useFilterState from '@/features/card-catalog/filtering/hooks/useFilterState';
import { cn } from '@/shared/utils/cn';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function SearchInput({ className, ...props }: Props) {
  const { state, setters } = useFilterState();

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setters.searchQuery(e.target.value);
  };

  return (
    <div
      className={cn([
        'border-primary flex w-64 items-center justify-between rounded-t-lg border-b-2 px-1 transition-all focus-within:bg-yellow-300/5',
        className,
      ])}
    >
      <input
        value={state.searchQuery || ''}
        onChange={handleChange}
        placeholder="Search cards"
        type="search"
        className="placeholder:text-text-muted w-full bg-transparent py-3 text-sm leading-none font-semibold focus:outline-none"
        {...props}
      />
      <Search className="text-text-muted" strokeWidth={2} />
    </div>
  );
}

export default SearchInput;
