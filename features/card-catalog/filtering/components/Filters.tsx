import { CARD_FILTER_DEFAULTS } from '@/features/card-catalog/filtering/config/card-filter-config';

import FilterPopover from './FilterPopover';
import ClearAllFiltersButton from './ClearAllFiltersButton';
import { SetsWithPacks } from '../../api/fetchSetData';
import SetFilter from './filters/SetFilter';
import ColorFilter from './filters/ColorFilter';
import RarityFilter from './filters/RarityFilter';
import CardTypeFilter from './filters/CardTypeFilter';
import HpFilter from './filters/HpFilter';
import ExFilter from './filters/ExFilter';

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
        <HpFilter min={CARD_FILTER_DEFAULTS.minHp} max={CARD_FILTER_DEFAULTS.maxHp} />
      </FilterPopover>

      <FilterPopover filterKeys="ex" name="EX">
        <ExFilter />
      </FilterPopover>

      <ClearAllFiltersButton />
    </div>
  );
}

export default Filters;
