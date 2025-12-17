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

      <FilterSidebar className="row-start-2 sticky top-[calc(var(--spacing-header-height)+var(--spacing-topbar-height))] h-fit max-h-[calc(100vh-((var(--spacing-header-height)+var(--spacing-topbar-height))))]" />

      <CardListWithPrefetchedData searchParams={searchParams} />
    </main>
  );
}

export default CardsPage;
