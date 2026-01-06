import DeckForm from '@/features/deck-management/deck-form/components/DeckForm';
import Seperator from '@/shared/components/ui/Seperator';
import DeckBuilder from '@/features/deck-management/deck-builder/components/DeckBuilder';
import FilterTopbar from '@/features/card-catalog/filtering/components/FilterTopbar';
import CardListWithPrefetchedData from '@/features/card-catalog/components/CardListWithPrefetchedData';
import DeckStatistics from '@/features/deck-management/deck-statistics/components/DeckStatistics';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function DeckBuilderPage({ searchParams }: Props) {
  return (
    <main className="max-w-mw relative grid w-full grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-7">
      <FilterTopbar className="top-header-height h-topbar-height bg-bg-base sticky z-30 col-span-2" />
      <CardListWithPrefetchedData searchParams={searchParams} columns="4" isInDeckBuilder />

      <div className="sticky top-[calc(var(--spacing-header-height)+var(--spacing-topbar-height))] flex h-fit max-h-[calc(100vh-((var(--spacing-header-height)+var(--spacing-topbar-height))))] flex-col gap-4 overflow-hidden">
        <DeckStatistics />

        <div className="bg-bg-1 flex h-fit w-fit flex-col gap-4 overflow-auto rounded-xl p-4">
          <DeckForm />
          <Seperator />
          <DeckBuilder />
        </div>
      </div>
    </main>
  );
}

export default DeckBuilderPage;
