import { Tables } from '@/types/database';

export function getCardUrl(card: Pick<Tables<'card_view'>, 'id' | 'name'>) {
  const nameFormatted = card.name.replace(' ', '_');

  const slug = `${card.id}-${nameFormatted}`;

  return `/card/${slug}`;
}

export function getCardIdFromSlug(slug: string) {
  const matches = slug.match(/(?:[A-Z]\d+[a-z]?|P-[A-Z])-\d{3}/);

  return matches?.[0] || null;
}
