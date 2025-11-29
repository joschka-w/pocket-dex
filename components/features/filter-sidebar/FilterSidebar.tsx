import { cn } from '@/lib/utils';
import FilterWrapper from './FIlterWrapper';
import Seperator from '@/components/ui/Seperator';

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
        <FilterWrapper label="Set" />
        <Seperator />
      </ul>
    </aside>
  );
}

export default FilterSidebar;
