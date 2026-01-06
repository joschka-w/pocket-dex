import z from 'zod';
import { Constants } from '@/types/database-generated';
import { MAX_DECK_SIZE, MAX_ENERGIES_PER_DECK } from '../../deck-builder/constants/deck-builder';

export type DeckSchema = z.infer<typeof deckValidationSchema>;

const title = z
  .string('Invalid deck name')
  .min(1, 'Deck name is required')
  .max(100, 'Deck name is too long (max 100 characters)');

const description = z.string().max(500, 'Description is too long (max 500 characters)').optional();

const cards = z.record(z.string(), z.int()).refine(cards => {
  const cardCount = Object.entries(cards).reduce((sum, [, cardQuantity]) => sum + cardQuantity, 0);
  return cardCount === MAX_DECK_SIZE;
}, `Deck has to have ${MAX_DECK_SIZE} cards`);

const energies = z
  .array(z.enum(Constants.public.Enums.color), 'Invalid energies')
  .min(1, 'Select at least 1 energy type')
  .max(MAX_ENERGIES_PER_DECK, `Max ${MAX_ENERGIES_PER_DECK} energy types allowed`);

export const deckValidationSchema = z.object({
  title,
  description,
  cards,
  energies,
});
