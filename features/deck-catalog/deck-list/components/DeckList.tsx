import { cn } from '@/shared/utils/cn';
import Deck from './Deck';
import { fetchDecks } from '../api/fetchDecks';
import DecksLoadingPopup from './DecksLoadingPopup';
import Error from '@/shared/components/Error';

interface Props {
  className?: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function DeckList({ searchParams, className }: Props) {
  const { data, error } = await fetchDecks(await searchParams);

  if (error) {
    return <Error message={`Error while fetching decks: ${error.message}`} />;
  }

  return (
    <ol className={cn('relative grid w-full grid-cols-2 gap-7', className)}>
      {data?.map(deck => (
        <li key={`deck-list-${deck.id}`}>
          <Deck deck={deck} />
        </li>
      ))}
      <DecksLoadingPopup decks={data} />
    </ol>
  );
}

export default DeckList;
