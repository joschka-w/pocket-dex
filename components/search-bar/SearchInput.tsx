import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function SearchInput({ className, ...props }: Props) {
  return (
    <div
      className={cn([
        'flex w-64 items-center justify-between rounded-t-lg border-b-2 border-primary px-1 transition-all focus-within:bg-yellow-300/5',
        className,
      ])}
    >
      <input
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
