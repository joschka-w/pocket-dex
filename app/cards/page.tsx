import { Suspense } from 'react';

import FilterSidebar from '@/components/features/filter-sidebar/FilterSidebar';
import Searchbar from '@/components/features/search-bar/Searchbar';
import CardListWithPrefetchedData from '@/components/features/card-list/CardListWithPrefetchedData';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CardsPage({ searchParams }: Props) {
  return (
    <main className="w-full max-w-mw grid grid-cols-[1fr_3fr] grid-rows-[var(--spacing-topbar-height)_1fr] gap-x-7">
      <Suspense>
        <Searchbar className="col-start-2 sticky top-header-height h-topbar-height z-10" />
      </Suspense>

      {/* // TODO - Find better solution for height of sidebar */}
      <FilterSidebar className="row-start-2 sticky top-[calc(var(--spacing-header-height)+var(--spacing-topbar-height))] h-[calc(100vh-10rem)]" />

      <CardListWithPrefetchedData searchParams={searchParams} />
    </main>
  );
}

export default CardsPage;
