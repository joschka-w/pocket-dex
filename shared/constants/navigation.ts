export interface Link {
  name: string;
  slug: string;
  isExternal?: boolean;
}

export const NAV_LINKS: Link[] = [
  { name: 'Cards', slug: 'cards' },
  { name: 'Decks', slug: 'decks' },
  { name: 'Deck Builder', slug: 'deck-builder' },
];

export const LEGAL_LINKS: Link[] = [
  { name: 'Privacy', slug: 'privacy' },
  { name: 'Terms', slug: 'terms' },
  { name: 'Cookies', slug: 'cookies' },
  { name: 'Impressum', slug: 'impressum' },
];

export const OTHER_LINKS: Link[] = [
  {
    name: 'GitHub',
    slug: 'https://github.com/joschka-w/pocket-dex',
    isExternal: true,
  },
];
