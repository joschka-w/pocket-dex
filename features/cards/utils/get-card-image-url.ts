import { Tables } from '@/types/database';

export function getCardImageUrl(cardId: Tables<'card'>['id'], quality: 'high' | 'low') {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cards/${quality}/${cardId}.wepb`;
}
