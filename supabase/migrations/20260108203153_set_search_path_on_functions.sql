ALTER FUNCTION array_distinct(anyarray, boolean) SET search_path = pg_catalog, public;
ALTER FUNCTION create_deck(text, color[], jsonb, text) SET search_path = pg_catalog, public;

ALTER FUNCTION create_pokemon_card(
  text,
  text,
  text,
  integer,
  rarity,
  card_type,
  text,
  text,
  integer,
  color,
  integer,
  color,
  boolean,
  stage,
  text,
  text,
  integer[],
  text,
  color[],
  integer,
  text,
  text,
  text,
  color[],
  integer,
  text,
  text
) SET search_path = pg_catalog, public;

ALTER FUNCTION create_trainer_card(
  text,
  text,
  text,
  integer,
  rarity,
  card_type,
  text,
  text,
  integer[],
  trainer_card_type,
  integer,
  text
) SET search_path = pg_catalog, public;

ALTER FUNCTION get_card_count(bigint) SET search_path = pg_catalog, public;

ALTER FUNCTION get_enum_values(text) SET search_path = pg_catalog, public;

ALTER FUNCTION set_created_at() SET search_path = pg_catalog, public;

ALTER FUNCTION username_exists(text) SET search_path = pg_catalog, public;

ALTER FUNCTION validate_pokemon_card() SET search_path = pg_catalog, public;

ALTER FUNCTION validate_trainer_card() SET search_path = pg_catalog, public;