import DeckList from '@/features/deck-catalog/deck-list/components/DeckList';
import DeckTopbar from '@/features/deck-catalog/filtering/components/DeckTopbar';
import { Suspense } from 'react';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function DecksPage({ searchParams }: Props) {
  return (
    <main className="max-w-mw w-full">
      <Suspense>
        <DeckTopbar className="top-header-height h-topbar-height bg-bg-base sticky z-30" />
      </Suspense>

      <DeckList searchParams={searchParams} />
    </main>
  );
}

export default DecksPage;
