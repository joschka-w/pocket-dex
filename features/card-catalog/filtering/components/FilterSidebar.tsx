import { cn } from '@/shared/utils/cn';

import Seperator from '@/shared/components/ui/Seperator';
import ColorFilter from './filters/ColorFilter';
import HpFilter from './filters/HpFilter';
import RarityFilter from './filters/RarityFilter';
import SetFilter from './filters/SetFilter';
import ClearAllFiltersButton from './ClearAllFiltersButton';
import CardTypeFilter from './filters/CardTypeFilter';
import ExFilter from './filters/ExFilter';
import { CARD_FILTER_DEFAULTS } from '@/features/card-catalog/filtering/config/card-filter-config';
import fetchSetData from '../../api/fetchSetData';

interface Props {
  className?: string;
}

async function FilterSidebar({ className }: Props) {
  const { data: setData, error } = await fetchSetData();

  if (error) console.error(error); // ! Add proper error handling

  return (
    <aside className={cn('bg-bg-1 relative overflow-auto rounded-xl', className)}>
      <header className="bg-bg-1 sticky top-0 z-10 flex items-center justify-between p-7">
        <h3 className="text-xl font-semibold">Filters</h3>
        <ClearAllFiltersButton />
      </header>

      <ul className="flex flex-col gap-5 p-7 pt-0">
        <SetFilter allSets={setData} />
        <Seperator />
        <ColorFilter />
        <Seperator />
        <RarityFilter />
        <Seperator />
        <CardTypeFilter />
        <Seperator />
        <HpFilter min={CARD_FILTER_DEFAULTS.minHp} max={CARD_FILTER_DEFAULTS.maxHp} />
        <Seperator />
        <ExFilter />
      </ul>
    </aside>
  );
}

export default FilterSidebar;
