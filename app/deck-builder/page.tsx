import DeckBuilder from '@/components/features/deck-builder/DeckBuilder';
import CardListWithPrefetchedData from '@/components/features/card-list/CardListWithPrefetchedData';
import DeckForm from '@/components/features/deck-form/DeckForm';
import FilterTopbar from '@/components/features/filter-topbar/FilterTopbar';
import Seperator from '@/components/ui/Seperator';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function DeckBuilderPage({ searchParams }: Props) {
  return (
    <main className="relative grid w-full max-w-mw grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-7 ">
      <FilterTopbar className="col-span-2 sticky top-header-height h-topbar-height bg-bg-base z-30" />
      <CardListWithPrefetchedData searchParams={searchParams} columns="4" isInDeckBuilder />

      <div className="flex flex-col gap-4 h-fit sticky top-[calc(var(--spacing-header-height)+var(--spacing-topbar-height))]">
        {/* <DeckStatistics /> */}

        <div className="flex h-fit w-fit flex-col gap-4 rounded-xl bg-bg-1/50 p-4">
          <DeckForm />
          <Seperator />
          <DeckBuilder />
        </div>
      </div>
    </main>
  );
}

export default DeckBuilderPage;
