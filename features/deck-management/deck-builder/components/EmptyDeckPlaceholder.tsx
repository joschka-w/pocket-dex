import { CircleSlash2Icon } from 'lucide-react';

function EmptyDeckPlaceholder() {
  return (
    <div className="text-text-muted col-span-5 flex h-40 flex-col items-center justify-center">
      <CircleSlash2Icon className="mb-3" />

      <p className="mb-1 font-semibold">Deck is empty</p>
      <p className="text-sm">Add cards to build your deck</p>
    </div>
  );
}

export default EmptyDeckPlaceholder;
