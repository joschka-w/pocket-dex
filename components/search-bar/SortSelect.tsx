import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type SortFilter = 'name' | 'id' | 'rarity' | 'hp' | 'color';

const sortNamesMap: Record<SortFilter, string> = {
  id: 'Id',
  name: 'Name',
  rarity: 'Rarity',
  color: 'Color',
  hp: 'HP',
};

function SortSelect() {
  return (
    <Select>
      <div className="flex items-center gap-3">
        <span>Sort by: </span>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent align="end">
          {Object.entries(sortNamesMap).map(([value, displayText]) => (
            <SelectItem value={value} key={value}>
              {displayText}
            </SelectItem>
          ))}
        </SelectContent>
      </div>
    </Select>
  );
}

export default SortSelect;
