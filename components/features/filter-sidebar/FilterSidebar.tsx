import { cn } from '@/lib/utils/cn';

import Seperator from '@/components/ui/Seperator';
import ColorFilter from './filter-components/ColorFilter';
import HpFilter from './filter-components/HpFilter';
import RarityFilter from './filter-components/RarityFilter';
import SetFilter from './filter-components/SetFilter';
import ClearAllFiltersButton from './ClearAllFiltersButton';
import CardTypeFilter from './filter-components/CardTypeFilter';
import ExFilter from './filter-components/ExFilter';
import { FILTER_DEFAULTS } from '@/lib/filters/filterConfig';
import fetchSetData from '@/lib/data/fetchSetData';

interface Props {
  className?: string;
}

async function FilterSidebar({ className }: Props) {
  const { data: setData, error } = await fetchSetData();

  if (error) console.error(error); // ! Add proper error handling

  return (
    <aside className={cn('bg-bg-1 rounded-xl overflow-auto relative', className)}>
      <header className="flex items-center justify-between sticky top-0 p-7 bg-bg-1 z-10">
        <h3 className="font-semibold text-xl">Filters</h3>
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
        <HpFilter min={FILTER_DEFAULTS.minHp} max={FILTER_DEFAULTS.maxHp} />
        <Seperator />
        <ExFilter />
      </ul>
    </aside>
  );
}

export default FilterSidebar;
