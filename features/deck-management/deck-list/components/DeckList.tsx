import { cn } from '@/shared/utils/cn';
import Deck from './Deck';
import fetchDecks from '../../api/fetchDecks';

interface Props {
  className?: string;
}

async function DeckList({ className }: Props) {
  const { data, error } = await fetchDecks();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return (
    <ol className={cn('grid w-full grid-cols-2 gap-7', className)}>
      {data?.map(deck => (
        <li key={`deck-list-${deck.id}`}>
          <Deck deck={deck} />
        </li>
      ))}
    </ol>
  );
}

export default DeckList;
