import { cn } from '@/shared/utils/cn';

import Filters from './Filters';
import SearchInput from '../../search/SearchInput';
import SortSelect from '../../search/SortSelect';
import SortDirectionToggle from '../../search/SortDirectionToggle';
import fetchSetData from '../../api/fetchSetData';

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

      <div className="ml-auto flex gap-2">
        <SortSelect />
        <SortDirectionToggle />
      </div>
    </div>
  );
}

export default FilterTopbar;
