import { PlusIcon } from 'lucide-react';

function AddCardBtnInitial() {
  return (
    <button className="absolute top-1/2 left-1/2 z-20 flex aspect-square w-20 -translate-1/2 cursor-pointer items-center justify-center rounded-xl bg-black/70 opacity-0 backdrop-blur-xs transition-opacity duration-100 group-hover:opacity-100">
      <PlusIcon size={44} strokeWidth={3} className="text-primary" />
    </button>
  );
}

export default AddCardBtnInitial;
