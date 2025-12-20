import { MinusIcon, PlusIcon } from 'lucide-react';
import { MouseEventHandler } from 'react';

interface Props {
  onAddClick: MouseEventHandler<HTMLButtonElement>;
  onRemoveClick: MouseEventHandler<HTMLButtonElement>;
  disableAddCard?: boolean;
}

function AddRemoveCardBtns({ onAddClick, onRemoveClick, disableAddCard }: Props) {
  return (
    <div className="absolute left-1/2 bottom-5 rounded-lg z-20 group-hover:flex hidden w-28 -outline-offset-2 outline-2 outline-bg-2 -translate-x-1/2 h-8 overflow-hidden">
      <button
        onClick={onRemoveClick}
        className="text-danger bg-bg-1 flex-1 flex items-center justify-center cursor-pointer hover:bg-bg-2"
      >
        <MinusIcon strokeWidth={2.5} />
      </button>

      <button
        disabled={disableAddCard}
        onClick={onAddClick}
        className="text-confirmation not-disabled:hover:bg-bg-2 disabled:bg-neutral-800 bg-bg-1 flex-1 disabled:text-text-muted flex items-center justify-center disabled:cursor-default cursor-pointer"
      >
        <PlusIcon strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default AddRemoveCardBtns;
