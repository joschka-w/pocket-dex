'use server';

import { LoaderInput } from 'nuqs/server';
import { FILTER_DEFAULTS, loadSearchParams, SortFilter } from '../filters/filterConfig';
import { createClient } from '../utils/supabase/server';

async function fetchCards(searchParams: LoaderInput) {
  // Cache each unique filter combination. Common patterns (like no filters or only sorting) avoid repeated fetches.
  // Use tags on fetchOptions to revalidate all when the database updates (e.g. a new set is added).

  // If cache size becomes problematic (too many filter permutations), we could check
  // for filter complexity (e.g. how many filters are applied) and skip caching these requests.
  const supabase = await createClient({
    fetchOptions: {
      next: {
        revalidate: 60 * 60 * 24,
      },
    },
  });
  const filters = loadSearchParams(searchParams);

  let query = supabase.from('card_view_new').select('*');

  if (filters.set && filters.set.length > 0) {
    query = query.filter('packs', 'ov', `{${filters.set.join(',')}}`);
  }

  if (filters.color && filters.color.length > 0) {
    query = query.in('pokemon_card->>type', filters.color);
  }

  if (filters.rarity && filters.rarity.length > 0) {
    query = query.in('rarity', filters.rarity);
  }

  if (filters.cardType.length > 0) {
    const trainerTypeMap = {
      item: 'Item',
      support: 'Supporter',
      tool: 'Pokemon Tool',
      fossil: 'Item (Fossil)',
    } as const;

    const trainerTypes = filters.cardType
      .filter(filter => filter !== 'pokemon')
      .map(filter => trainerTypeMap[filter]);

    const hasPokemon = filters.cardType.includes('pokemon');
    const hasOnlyPokemon = hasPokemon && filters.cardType.length === 1;

    // Only pokemon
    if (hasOnlyPokemon) {
      query = query.eq('card_type', 'pokemon');
    }
    // Only trainer
    else if (!hasPokemon) {
      query = query.eq('card_type', 'trainer');
      query = query.in('trainer_card->>trainer_card_type', trainerTypes);
    }
    // Mixed (both pokemon and trainer)
    else {
      query = query.or(
        `card_type.eq.pokemon, trainer_card->>trainer_card_type.in.(${trainerTypes
          .map(val => `"${val}"`)
          .join(',')})`
      );
    }
  }

  if (filters.minHp !== FILTER_DEFAULTS.minHp) {
    query = query.or(
      `pokemon_card->hp.gte.${filters.minHp}, trainer_card->hp.gte.${filters.minHp}`
    );
  }

  if (filters.maxHp !== FILTER_DEFAULTS.maxHp) {
    query = query.or(
      `pokemon_card->hp.lte.${filters.maxHp}, trainer_card->hp.gte.${filters.maxHp}`
    );
  }

  if (filters.ex !== FILTER_DEFAULTS.ex) {
    query = query.eq('pokemon_card->>is_ex', filters.ex === 'all' ? 'true' : 'false');
  }

  if (filters.searchQuery) {
    query = query.ilike('name', `%${filters.searchQuery}%`);
  }

  //TODO - HP of fossils should be included when filtering for hp, currently its treated as null
  const sortFilterMap: Record<SortFilter, string> = {
    color: 'pokemon_card->type',
    hp: 'pokemon_card->hp',
    id: 'id',
    name: 'name',
    rarity: 'rarity',
  };

  // Sort primarily by the selected filter in specified direction,
  // then alphabetically by name in ascending order (a-z)
  query = query
    .order(sortFilterMap[filters.sortBy], {
      ascending: filters.sortDirection === 'asc',
      nullsFirst: false,
    })
    .order('name', { ascending: true });

  return await query;
}

export default fetchCards;
