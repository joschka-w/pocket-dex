import { cn } from '@/lib/utils/cn';

import SearchInput from './SearchInput';
import SortSelect from './SortSelect';
import SortDirectionToggle from './SortDirectionToggle';

interface Props {
  className?: string;
}

function Searchbar({ className }: Props) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <SearchInput />

      <div className="flex gap-2">
        <SortSelect />
        <SortDirectionToggle />
      </div>
    </div>
  );
}

export default Searchbar;
