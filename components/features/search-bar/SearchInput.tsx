'use client';

import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

import useFilterState from '@/lib/hooks/useFilterState';
import { cn } from '@/lib/utils/cn';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function SearchInput({ className, ...props }: Props) {
  const { state, setters } = useFilterState();

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setters.searchQuery(e.target.value);
  };

  return (
    <div
      className={cn([
        'flex w-64 items-center justify-between rounded-t-lg border-b-2 border-primary px-1 transition-all focus-within:bg-yellow-300/5',
        className,
      ])}
    >
      <input
        value={state.searchQuery || ''}
        onChange={handleChange}
        placeholder="Search cards"
        type="search"
        className="w-full bg-transparent py-3 text-sm font-semibold leading-none placeholder:text-text-muted focus:outline-none"
        {...props}
      />
      <Search className="text-text-muted" strokeWidth={2} />
    </div>
  );
}

export default SearchInput;
