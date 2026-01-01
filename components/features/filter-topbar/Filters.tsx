import { FILTER_DEFAULTS } from '@/lib/filters/filterConfig';

import FilterPopover from './FilterPopover';
import ClearAllFiltersButton from '../filter-sidebar/ClearAllFiltersButton';
import SetFilter from '../filter-sidebar/filter-components/SetFilter';
import ColorFilter from '../filter-sidebar/filter-components/ColorFilter';
import RarityFilter from '../filter-sidebar/filter-components/RarityFilter';
import CardTypeFilter from '../filter-sidebar/filter-components/CardTypeFilter';
import HpFilter from '../filter-sidebar/filter-components/HpFilter';
import ExFilter from '../filter-sidebar/filter-components/ExFilter';
import { SetsWithPacks } from '@/lib/data/fetchSetData';

interface Props {
  setData: SetsWithPacks;
}

function Filters({ setData }: Props) {
  return (
    <div className="ml-10 flex items-center gap-2">
      <FilterPopover filterKeys="set" name="Set">
        <SetFilter allSets={setData} initialVisibleCount={15} />
      </FilterPopover>

      <FilterPopover filterKeys="color" name="Color">
        <ColorFilter />
      </FilterPopover>

      <FilterPopover filterKeys="rarity" name="Rarity">
        <RarityFilter />
      </FilterPopover>

      <FilterPopover filterKeys="cardType" name="Card Type">
        <CardTypeFilter />
      </FilterPopover>

      <FilterPopover filterKeys={['minHp', 'maxHp']} name="HP">
        <HpFilter min={FILTER_DEFAULTS.minHp} max={FILTER_DEFAULTS.maxHp} />
      </FilterPopover>

      <FilterPopover filterKeys="ex" name="EX">
        <ExFilter />
      </FilterPopover>

      <ClearAllFiltersButton />
    </div>
  );
}

export default Filters;
