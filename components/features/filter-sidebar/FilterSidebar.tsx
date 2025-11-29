import { cn } from '@/lib/utils/cn';

import Seperator from '@/components/ui/Seperator';
import ColorFilter from './filter-components/ColorFilter';
import HpFilter from './filter-components/HpFilter';

interface Props {
  className?: string;
}

function FilterSidebar({ className }: Props) {
  return (
    <aside className={cn('bg-bg-1 rounded-xl p-7', className)}>
      <header className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">Filters</h3>
        <button className="text-text-muted cursor-pointer hover:underline hover:text-text transition-colors active:text-text-muted">
          Clear all
        </button>
      </header>

      <ul className="flex flex-col gap-5 mt-7">
        <ColorFilter />
        <Seperator />
        <HpFilter min={0} max={210} />
        <Seperator />
      </ul>
    </aside>
  );
}

export default FilterSidebar;
