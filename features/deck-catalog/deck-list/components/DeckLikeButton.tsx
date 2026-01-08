'use client';

import { HeartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/shared/utils/cn';
import { DeckResult } from '../api/fetchDecks';
import { useLikeDeck } from '../hooks/useLikeDeck';
import toast from 'react-hot-toast';

interface Props {
  deck: DeckResult;
  userId?: string;
}

function DeckLikeButton({ deck, userId }: Props) {
  const { isLiked, likesCount, toggleLike, error } = useLikeDeck(deck, userId);
  const [isInitial, setIsInitial] = useState(true);

  const handleClick = () => {
    toggleLike(deck.id);
    setIsInitial(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, { id: error.message });
    }
  }, [error]);

  return (
    <div className="flex gap-2">
      <span className="font-medium">{likesCount}</span>

      <button onClick={handleClick} className="cursor-pointer transition-transform hover:scale-110">
        <HeartIcon
          data-state={!isInitial && (isLiked ? 'liked' : 'unliked')}
          className={cn(
            'data-[state="liked"]:animate-[like_500ms_cubic-bezier(0.34,1.56,0.64,1)] data-[state="unliked"]:animate-[unlike_300ms_ease-in-out]',
            isLiked && 'fill-red-500 text-red-500',
          )}
        />
      </button>
    </div>
  );
}

export default DeckLikeButton;
