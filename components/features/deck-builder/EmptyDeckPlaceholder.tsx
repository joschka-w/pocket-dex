import { CircleSlash2Icon } from 'lucide-react';

function EmptyDeckPlaceholder() {
  return (
    <div className="col-span-5 h-40 flex justify-center items-center text-text-muted flex-col">
      <CircleSlash2Icon className="mb-3" />

      <p className="font-semibold mb-1">Deck is empty</p>
      <p className="text-sm">Add cards to build your deck</p>
    </div>
  );
}

export default EmptyDeckPlaceholder;
