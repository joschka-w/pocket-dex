import CardListWithPrefetchedData from '@/features/card-catalog/components/CardListWithPrefetchedData';
import FilterSidebar from '@/features/card-catalog/filtering/components/FilterSidebar';
import Searchbar from '@/features/card-catalog/search/Searchbar';
import { Suspense } from 'react';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function CardsPage({ searchParams }: Props) {
  return (
    <main className="max-w-mw grid w-full grid-cols-[1fr_3fr] grid-rows-[var(--spacing-topbar-height)_1fr] gap-x-7">
      <Suspense>
        <Searchbar className="top-header-height h-topbar-height sticky z-10 col-start-2" />
      </Suspense>

      <FilterSidebar className="sticky top-[calc(var(--spacing-header-height)+var(--spacing-topbar-height))] row-start-2 h-fit max-h-[calc(100vh-((var(--spacing-header-height)+var(--spacing-topbar-height))))]" />

      <CardListWithPrefetchedData searchParams={searchParams} />
    </main>
  );
}

export default CardsPage;
