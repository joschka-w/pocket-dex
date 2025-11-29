import FilterSidebar from '@/components/features/filter-sidebar/FilterSidebar';
import Searchbar from '@/components/features/search-bar/Searchbar';

// cards/page.tsx
function CardsPage() {
  return (
    <main className="w-full max-w-mw grid grid-cols-[1fr_3fr] grid-rows-[3rem_1fr] gap-7 h-[calc(100vh-5rem)]">
      <Searchbar className="col-start-2" />

      <FilterSidebar className="row-start-2" />

      <div className="bg-yellow-500 overflow-y-auto">
        <div className="from-transparent to to-black/50 bg-linear-to-b h-[2000px]" />
      </div>
    </main>
  );
}

export default CardsPage;
