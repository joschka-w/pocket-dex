import { cn } from '@/lib/utils/cn';

import Filters from './Filters';
import SearchInput from '../search-bar/SearchInput';
import SortSelect from '../search-bar/SortSelect';
import SortDirectionToggle from '../search-bar/SortDirectionToggle';
import fetchSetData from '@/lib/data/fetchSetData';

interface Props {
  className?: string;
}

async function FilterTopbar({ className }: Props) {
  const { data: setData, error } = await fetchSetData();

  if (error) console.error(error); // ! Add proper error handling

  return (
    <div className={cn('flex items-center', className)}>
      <SearchInput />
      <Filters setData={setData} />

      <div className="flex gap-2 ml-auto">
        <SortSelect />
        <SortDirectionToggle />
      </div>
    </div>
  );
}

export default FilterTopbar;
