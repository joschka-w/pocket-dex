import CardList from '@/components/features/card-list/CardList';
import FilterSidebar from '@/components/features/filter-sidebar/FilterSidebar';
import Searchbar from '@/components/features/search-bar/Searchbar';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CardsPage({ searchParams }: Props) {
  // TODO - Calculate these heights and positions based on variables, not just hard coded

  return (
    <main className="w-full max-w-mw grid grid-cols-[1fr_3fr] grid-rows-[3rem_1fr] gap-7">
      <Searchbar className="col-start-2 sticky top-16 h-fit py-4 bg-bg-base" />

      <FilterSidebar className="row-start-2 sticky top-34 h-[calc(100vh-10rem)]" />

      <CardList searchParams={searchParams} />
    </main>
  );
}

export default CardsPage;
