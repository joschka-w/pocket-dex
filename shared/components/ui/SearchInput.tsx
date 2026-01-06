import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { SearchIcon } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function SearchInput({ className, ...props }: Props) {
  return (
    <div
      className={cn([
        'border-primary flex w-64 items-center justify-between rounded-t-lg border-b-2 px-1 transition-all focus-within:bg-yellow-300/5',
        className,
      ])}
    >
      <input
        placeholder="Search cards"
        type="search"
        className="placeholder:text-text-muted w-full bg-transparent py-3 text-sm leading-none font-semibold focus:outline-none"
        {...props}
      />
      <SearchIcon className="text-text-muted" strokeWidth={2} />
    </div>
  );
}

export default SearchInput;
