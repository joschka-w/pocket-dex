import { PlusIcon } from 'lucide-react';

function AddCardBtnInitial() {
  return (
    <button className="absolute group-hover:opacity-100 opacity-0 transition-opacity duration-100 flex cursor-pointer justify-center items-center bg-black/70 backdrop-blur-xs left-1/2 top-1/2 -translate-1/2 w-20 rounded-xl aspect-square z-20">
      <PlusIcon size={44} strokeWidth={3} className="text-primary" />
    </button>
  );
}

export default AddCardBtnInitial;
