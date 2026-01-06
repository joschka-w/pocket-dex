import { useMutation, useQuery } from '@tanstack/react-query';

import { createClient } from '../../../../shared/utils/supabase/client';
import { getQueryClient } from '../../../../shared/utils/getQueryClient';
import { DeckResult } from '../api/fetchDecks';

type OnMutateResult = {
  prevUserLikes?: Set<string>;
  prevCount?: number;
};

// This is spaghetti code, works for now though
// TODO - Maybe abstract into general 'useOptimisticMutation' hook or something, or at least split up into code thats more readable
export function useLikeDeck(deck: DeckResult, userId?: string) {
  const queryClient = getQueryClient();
  const supabase = createClient();

  const userLikesQueryKey = ['user-likes', userId];
  const likesCountQueryKey = ['deck-likes-count', deck.id];

  const fetchUserLikes = async () => {
    const { data, error } = await supabase
      .from('deck_likes')
      .select('deck_id')
      .eq('user_id', userId!);

    if (error) throw new Error(error.message);

    return new Set(data.map(d => d.deck_id));
  };

  const { data: userLikes } = useQuery<Set<string>>({
    queryKey: userLikesQueryKey,
    queryFn: fetchUserLikes,
    enabled: Boolean(userId),
    select(data) {
      if (Array.isArray(data)) {
        return new Set(data);
      }

      return data;
    },
    staleTime: 1000 * 60 * 60,
  });

  // Cache for likes count on deck (so we can have optimistic updates)
  const { data: likesCount } = useQuery({
    queryKey: likesCountQueryKey,
    queryFn: () => deck.likes_count,
    initialData: deck.likes_count,
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: async (deckId: string) => {
      const { data: newLikeCount, error } = await supabase.rpc('like_deck', { p_deck_id: deckId });

      if (error) throw new Error(error.message);

      return newLikeCount;
    },
    onMutate: async deckId => {
      const { prevUserLikes, wasLiked } = await toggleUserLikesOptimistic(deckId);
      const { prevCount } = await updateCountOptimistic(wasLiked);

      return { prevUserLikes, prevCount };
    },
    onSuccess: newCount => {
      // Update with likes count from server (like_deck function returns new like count)
      queryClient.setQueryData(likesCountQueryKey, newCount);
    },
    onError: (error, _deckId, onMutateResult) => {
      handleRollback(onMutateResult);
      console.error('Error toggling like: ', error);
    },
  });

  async function toggleUserLikesOptimistic(deckId: string) {
    await queryClient.cancelQueries({ queryKey: userLikesQueryKey });

    const prevUserLikes = queryClient.getQueryData<Set<string>>(userLikesQueryKey);
    const newUserLikes = new Set(prevUserLikes);
    const wasLiked = newUserLikes.has(deckId);

    if (wasLiked) newUserLikes.delete(deckId);
    else newUserLikes.add(deckId);

    queryClient.setQueryData(userLikesQueryKey, newUserLikes);

    return { prevUserLikes, wasLiked };
  }

  async function updateCountOptimistic(wasLiked: boolean) {
    await queryClient.cancelQueries({ queryKey: likesCountQueryKey });

    const prevCount = queryClient.getQueryData<number>(likesCountQueryKey);
    const newCount = (prevCount ?? 0) + (wasLiked ? -1 : 1);

    queryClient.setQueryData(likesCountQueryKey, newCount);

    return { prevCount };
  }

  function handleRollback(result: OnMutateResult | undefined) {
    if (result?.prevUserLikes) {
      queryClient.setQueryData(userLikesQueryKey, result.prevUserLikes);
    }

    if (result?.prevCount !== undefined) {
      queryClient.setQueryData(likesCountQueryKey, result.prevCount);
    }
  }

  const isLiked = userLikes?.has(deck.id);

  return {
    toggleLike,
    isLiked,
    likesCount,
  };
}
