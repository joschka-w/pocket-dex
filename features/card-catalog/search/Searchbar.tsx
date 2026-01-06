import { cn } from '@/shared/utils/cn';

import CardSearchInput from './CardSearchInput';
import SortSelect from './SortSelect';
import SortDirectionToggle from './SortDirectionToggle';

interface Props {
  className?: string;
}

function Searchbar({ className }: Props) {
  return (
    <div
      className={cn(
        'bg-bg-base relative flex items-center justify-between',
        // Added this pseudo-class to hide the edges of the cards in CardList, which scales when hovered
        "before:absolute before:left-1/2 before:-z-50 before:h-full before:w-[105%] before:-translate-x-1/2 before:bg-inherit before:content-['']",
        className,
      )}
    >
      <CardSearchInput />
      <div className="flex gap-2">
        <SortSelect />
        <SortDirectionToggle />
      </div>
    </div>
  );
}

export default Searchbar;
