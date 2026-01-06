import { cn } from '@/shared/utils/cn';

import Filters from './Filters';
import CardSearchInput from '../../search/CardSearchInput';
import SortSelect from '../../search/SortSelect';
import CardSortDirectionToggle from '../../search/SortDirectionToggle';
import fetchSetData from '../../api/fetchSetData';

interface Props {
  className?: string;
}

async function FilterTopbar({ className }: Props) {
  const { data: setData, error } = await fetchSetData();

  // ! Add proper error handling
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return (
    <div className={cn('flex items-center', className)}>
      <CardSearchInput />
      <Filters setData={setData} />

      <div className="ml-auto flex gap-2">
        <SortSelect />
        <CardSortDirectionToggle />
      </div>
    </div>
  );
}

export default FilterTopbar;
