import { cn } from '@/lib/utils/cn';

import SearchInput from './SearchInput';
import SortSelect from './SortSelect';
import SortDirectionToggle from './SortDirectionToggle';

interface Props {
  className?: string;
}

function Searchbar({ className }: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-between bg-bg-base relative',
        // Added the before pseudo-class to hide the edges of the card, which scales when hovered
        "before:content-[''] before:absolute before:h-full before:w-[105%] before:left-1/2 before:-translate-x-1/2 before:-z-50 before:bg-inherit",
        className
      )}
    >
      <SearchInput />
      <div className="flex gap-2">
        <SortSelect />
        <SortDirectionToggle />
      </div>
    </div>
  );
}

export default Searchbar;
